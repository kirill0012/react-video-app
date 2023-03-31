import axios from 'axios'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
// const isServer = typeof window === 'undefined'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

export default $api
