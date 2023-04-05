import type { NextPage } from 'next'
import type { AppProps } from 'next/app'
import App, { AppContext } from 'next/app'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'
import jsHttpCookie from 'cookie'
import axios from 'axios'

import createEmotionCache from '../utils/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'

import UserLayout from '@/layouts/UserLayout'

import '@/styles/globals.css'

import { AuthProvider } from '@/context/AuthContext'
import endpoints from '@/constants/endpoints'
import { UserDataType } from '@/services/auth'

const clientSideEmotionCache = createEmotionCache()

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
  auth: { user: UserDataType }
}

function MyApp({
  Component,
  emotionCache = clientSideEmotionCache,
  auth,
  pageProps,
}: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? ((page) => <UserLayout>{page}</UserLayout>)

  return (
    <AuthProvider initialUserValue={auth?.user || undefined}>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  )
}

MyApp.getInitialProps = async (appContext: AppContext) => {
  const appProps = await App.getInitialProps(appContext)

  if (appContext.ctx.req?.headers?.cookie) {
    const { token } = jsHttpCookie.parse(appContext.ctx.req.headers.cookie)

    if (token) {
      try {
        const session = await axios
          .get(`${process.env.NEXT_PUBLIC_API_URL}${endpoints.meEndpoint}`, {
            headers: appContext.ctx.req.headers.cookie
              ? { cookie: appContext.ctx.req.headers.cookie }
              : undefined,
            withCredentials: true,
          })
          .then((response) => {
            return response.data
          })

        return {
          ...appProps,
          auth: { user: session },
        }
      } catch {
        // invalid token
      }
    }
  }

  if (appContext.ctx.pathname != '/login') {
    appContext.ctx.res?.writeHead(307, { Location: '/login' })
    appContext.ctx.res?.end()
  }

  return { ...appProps, auth: { user: null } }
}

export default MyApp
