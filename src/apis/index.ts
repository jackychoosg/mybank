import axios from 'axios'
import { ITransaction } from '../common/interfaces'

const BASE_API_URL = 'http://localhost:8000'

const getAccounts = async () => {
  const response = await axios.get(`${BASE_API_URL}/accounts`)
  return response.data
}

const getTrasactions = async () => {
  const response = await axios.get(`${BASE_API_URL}/transactions`)
  return response.data
}

const getCurrencies = async () => {
  const response = await axios.get(`${BASE_API_URL}/currencies`)
  return response.data
}

const createTransaction = async (data: ITransaction) => {
  const response = await axios.post(`${BASE_API_URL}/transactions`, data)
  return response.data
}

const apis = {
  getAccounts,
  getTrasactions,
  getCurrencies,
  createTransaction
}

export default apis
