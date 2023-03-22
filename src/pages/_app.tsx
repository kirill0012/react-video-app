import type { NextPage } from 'next'
import type { AppProps } from 'next/app'

import { CacheProvider, EmotionCache } from '@emotion/react'
import { ThemeProvider, CssBaseline } from '@mui/material'

import createEmotionCache from '../utils/createEmotionCache'
import lightTheme from '../styles/theme/lightTheme'

import UserLayout from '@/layouts/UserLayout'

import '@/styles/globals.css'

import { AuthProvider } from '@/context/AuthContext'

const clientSideEmotionCache = createEmotionCache();

// ** Extend App Props with Emotion
type ExtendedAppProps = AppProps & {
  Component: NextPage
  emotionCache: EmotionCache
}

export default function App({
  Component,
  emotionCache = clientSideEmotionCache,
  pageProps,
}: ExtendedAppProps) {
  const getLayout = Component.getLayout ?? (page => <UserLayout>{page}</UserLayout>)

  return (
    <AuthProvider>
      <CacheProvider value={emotionCache}>
        <ThemeProvider theme={lightTheme}>
          <CssBaseline />
          {getLayout(<Component {...pageProps} />)}
        </ThemeProvider>
      </CacheProvider>
    </AuthProvider>
  );
}
