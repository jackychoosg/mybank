export const strings = {
  common: {
    cancelText: 'Cancel',
    confirmText: 'Confirm',
    noData: 'There is no data, please choose other account',
    loading: 'Loading...'
  },
  dashboard: {
    title: 'My Account Transactions',
    tableHeader: {
      timestamp: 'Transaction Date',
      action: 'Action',
      description: 'Description',
      from: 'From account',
      to: 'To account',
      amount: 'Amount',
      currency: 'Currency'
    },
    account: 'Account',
    fromAccount: 'From account',
    toAccount: 'To account',
    defaultOptionLabel: '---Choose account---',
    newTransferText: 'New transfer',
    message: 'Your fund transfer was completed successfully!'
  },
  form: {
    header: 'Transfer Funds',
    defaultOptionLabel: '---Choose account---',
    defaultCurrencyOptionLabel: '---Choose currency---',
    from: 'From account',
    to: 'To account',
    currency: 'Currency',
    amountPlaceHolder: 'Please enter amount',
    errors: {
      fromAccount: 'From account is required',
      toAccount: 'To account is required',
      amount: 'Amount value is required',
      currencyId: 'Currency is required'
    }
  }
}
