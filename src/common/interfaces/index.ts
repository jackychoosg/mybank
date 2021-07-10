import { TransactionAction } from '../enums'

export interface ITransaction {
  id?: number
  accountId: number
  currencyId: number
  amount: number
  timestamp: number
  description: string
  action: TransactionAction
  reference: string
}

export interface IOption {
  id: number
  name: string
}

export interface IAccount {
  id: number
  accountNumber: string
  name: string
}

export interface ICurrency {
  id: number
  code: string
  name: string
}
