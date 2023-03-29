// ** React Imports
import { createContext, useState, ReactNode } from 'react'

// ** Next Import
import { useRouter } from 'next/router'

// ** Types
import { AuthValuesType, LoginParams, ErrCallbackType, UserDataType } from './types'
import { AuthAPI } from '@/services/auth'

// ** Defaults
const defaultProvider: AuthValuesType = {
  user: null,
  loading: true,
  setUser: () => null,
  setLoading: () => Boolean,
  login: () => Promise.resolve(),
  logout: () => Promise.resolve(),
}

const AuthContext = createContext(defaultProvider)

type Props = {
  children: ReactNode
  initialUserValue?: UserDataType
}

const AuthProvider = ({ children, initialUserValue }: Props) => {
  // ** States
  const [user, setUser] = useState<UserDataType | null>(initialUserValue || null)
  const [loading, setLoading] = useState<boolean>(defaultProvider.loading)

  // ** Hooks
  const router = useRouter()

  const handleLogin = (params: LoginParams, errorCallback?: ErrCallbackType) => {
    AuthAPI.login(params)
      .then((user) => {
        setUser(user)
        router.replace('/')
      })
      .catch((error) => {
        if (errorCallback) errorCallback(error.error)
      })
  }

  const handleLogout = (errorCallback?: ErrCallbackType) => {
    AuthAPI.logout()
      .then(async () => {
        setUser(null)
        router.replace('/login')
      })

      .catch((err) => {
        if (errorCallback) errorCallback(err)
      })
  }

  const values = {
    user,
    loading,
    setUser,
    setLoading,
    login: handleLogin,
    logout: handleLogout,
  }

  return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

export { AuthContext, AuthProvider }
