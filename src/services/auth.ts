import endpoints from '@/constants/endpoints'
import request from '@/lib/api/request'
import axios from 'axios'

export type UserDataType = {
  id: number
  name: string
  avatar?: string | null
}

export type LoginParams = {
  email: string
  password: string
}

export type Profile = {
  project: {
    title: string
    avatar: string | null
  } | null
  limits: {
    concept: number
    iterations: number
  }
}

export const AuthAPI = {
  login: async (params: LoginParams): Promise<UserDataType> => {
    const response = await request
      .request({
        url: endpoints.loginEndpoint,
        method: 'POST',
        data: params,
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    return response.data
  },
  profileServerSide: async (cookie?: string): Promise<Profile> => {
    return axios
      .get<Profile>(`${process.env.NEXT_PUBLIC_API_URL}${endpoints.profileEndpoint}`, {
        headers: cookie ? { cookie: cookie } : undefined,
        withCredentials: true,
      })
      .then((response) => {
        return response.data
      })
  },
  me: async () => {
    const response = await request
      .request({
        url: endpoints.meEndpoint,
        method: 'GET',
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    return response.data
  },
  logout: async () => {
    const response = await request
      .request({
        url: endpoints.logoutEndpoint,
        method: 'POST',
      })
      .catch((error) => {
        return Promise.reject(error)
      })

    return response.data
  },
}
