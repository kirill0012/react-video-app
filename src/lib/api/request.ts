import axios from 'axios'
import { NextApiRequest } from 'next'

export const API_URL = process.env.NEXT_PUBLIC_API_URL
const isServer = typeof window === 'undefined'

const $api = axios.create({
  withCredentials: true,
  baseURL: API_URL,
})

// export const get = <T>(url: string, req: NextApiRequest | null = null) =>
//   $api
//     .get<ApiDataResponse<T>>(
//       url,
//       req && req.headers.cookie != null ? { headers: { Cookie: req.headers.cookie } } : undefined
//     )
//     .then((res) => res.data)
//     .then((res) => res.data)

// export const post = <T>(
//   url: string,
//   payload: Record<string, string>,
//   req: NextApiRequest | null = null
// ) =>
//   $api
//     .post<ApiDataResponse<T>>(
//       url,
//       payload,
//       req && req.headers.cookie != null ? { headers: { Cookie: req.headers.cookie } } : undefined
//     )
//     .then((res) => res.data)
//     .then((res) => res.data)

// const request = { $api }

export default $api
