import React from 'react'
import moment from 'moment'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { FundTransfer } from '../components/FundTransfer'
import { Modal } from '../components/Modal'
import { TransactionList } from '../components/TransactionList'
import { IAccount, ICurrency, ITransaction } from '../common/interfaces'
import {
  Button,
  ButtonWrap,
  Container,
  FlexRow,
  Header
} from './styled.elements'
import R from '../assets'
import { TransactionAction } from '../common/enums'
import apis from '../apis'
import { Loading } from '../components/Loading'
import { DropDown } from '../components/Dropdown'

type Props = {}
type State = {
  selectedAccount: number
  fromAccount: number
  toAccount: number
  currencyId: number
  amount: number | string
  description: string
  showModal: boolean
  errors: {
    [key: string]: string
  }
  accounts: IAccount[]
  transactions: ITransaction[]
  currencies: ICurrency[]
  isLoading: boolean
}
class App extends React.PureComponent<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = {
      selectedAccount: 0,
      fromAccount: 0,
      toAccount: 0,
      currencyId: 0,
      amount: '',
      description: '',
      showModal: false,
      errors: {},
      accounts: [],
      transactions: [],
      currencies: [],
      isLoading: false
    }
  }

  componentDidMount() {
    this.onFetchDatas()
  }

  setDefaultState = () => {
    this.setState({
      fromAccount: 0,
      toAccount: 0,
      currencyId: 0,
      amount: '',
      description: '',
      showModal: false,
      errors: {}
    })
  }

  fetchTransactions = async () => {
    const transactions = await apis.getTrasactions()
    this.setState({
      transactions: transactions
    })
  }

  onFetchDatas = async () => {
    this.setState({ isLoading: true })
    try {
      const [accounts, transactions, currencies] = await Promise.all([
        apis.getAccounts(),
        apis.getTrasactions(),
        apis.getCurrencies()
      ])
      const firstAccount = accounts?.length > 0 ? accounts[0] : undefined
      this.setState({
        accounts: accounts,
        transactions: transactions,
        currencies: currencies,
        isLoading: false,
        selectedAccount: firstAccount?.id ?? 0
      })
    } catch (error) {
      this.setState({ isLoading: false })
    }
  }

  onDropdownChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    this.setState({
      selectedAccount: +e.target.value
    })
  }

  onFundTransferDropdownChange = (
    key: string,
    e: React.ChangeEvent<HTMLSelectElement>
  ) => {
    const value = +e.target.value
    this.setState((prevState: State) => ({
      ...prevState,
      errors: {
        ...prevState.errors,
        [key]: ''
      },
      [key]: value
    }))
  }

  onValueChange = (value?: string, name?: string) => {
    const { errors } = this.state
    if (name === 'amount') {
      this.setState({
        amount: value ?? '',
        errors: {
          ...errors,
          amount: +(value ?? '') === 0 ? R.strings.form.errors.amount : ''
        }
      })
    } else if (name === 'description') {
      this.setState({
        description: value ?? ''
      })
    }
  }

  onClosePopup = () => {
    this.setDefaultState()
  }

  onOpenPopup = () => {
    this.setState({
      showModal: true
    })
  }

  onConfirmTransfer = async () => {
    const { fromAccount, toAccount, amount, description, currencyId } =
      this.state
    const timestamp = moment().unix()
    const reference = `ref-${timestamp}`
    if (this.hasErrorOnFormData()) {
      return
    }
    this.setState({ isLoading: true })
    const fromTransaction = {
      accountId: fromAccount,
      currencyId,
      timestamp,
      reference,
      amount: +amount,
      description,
      action: TransactionAction.DEBIT
    }

    const toTransaction = {
      accountId: toAccount,
      currencyId,
      timestamp,
      reference,
      amount: +amount,
      description,
      action: TransactionAction.CREDIT
    }
    await Promise.all([
      apis.createTransaction(fromTransaction),
      apis.createTransaction(toTransaction)
    ])
    await this.fetchTransactions()
    this.setState({ isLoading: false })
    toast.success(R.strings.dashboard.message)
    this.onClosePopup()
  }

  hasErrorOnFormData = () => {
    const { fromAccount, toAccount, currencyId, amount } = this.state
    let errorCount = 0
    if (+fromAccount === 0) {
      this.setState((prevState: State) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          fromAccount: R.strings.form.errors.fromAccount
        }
      }))
      errorCount++
    }

    if (+toAccount === 0) {
      this.setState((prevState: State) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          toAccount: R.strings.form.errors.toAccount
        }
      }))
      errorCount++
    }

    if (+currencyId === 0) {
      this.setState((prevState: State) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          currencyId: R.strings.form.errors.currencyId
        }
      }))
      errorCount++
    }

    if (amount === '' || amount === 0) {
      this.setState((prevState: State) => ({
        ...prevState,
        errors: {
          ...prevState.errors,
          amount: R.strings.form.errors.amount
        }
      }))
      errorCount++
    }
    return Boolean(errorCount)
  }

  render() {
    const {
      selectedAccount,
      fromAccount,
      toAccount,
      currencyId,
      amount,
      description,
      errors,
      showModal,
      accounts = [],
      transactions = [],
      currencies = [],
      isLoading
    } = this.state
    return (
      <Container data-testid="app-container">
        <Header>{R.strings.dashboard.title}</Header>
        <FlexRow>
          <DropDown
            label={R.strings.dashboard.account}
            onChange={this.onDropdownChange}
            items={accounts}
            selectedItem={selectedAccount}
            defaultOptionLabel={R.strings.dashboard.defaultOptionLabel}
          />
          <ButtonWrap>
            <Button
              data-testid="new-transfer-button"
              color="green"
              onClick={this.onOpenPopup}
            >
              {R.strings.dashboard.newTransferText}
            </Button>
          </ButtonWrap>
        </FlexRow>

        <TransactionList
          rows={transactions}
          selectedAccount={selectedAccount}
          currencies={currencies}
        />
        {showModal && (
          <Modal
            title={R.strings.form.header}
            onClose={this.onClosePopup}
            onConfirm={this.onConfirmTransfer}
          >
            <FundTransfer
              fromAccount={fromAccount}
              toAccount={toAccount}
              accountDropdownOptions={accounts}
              amount={amount}
              onDropdownChange={this.onFundTransferDropdownChange}
              onValueChange={this.onValueChange}
              description={description}
              currencies={currencies}
              currencyId={currencyId}
              errors={errors}
            />
          </Modal>
        )}
        {isLoading && <Loading />}
        <ToastContainer />
      </Container>
    )
  }
}

export default App
