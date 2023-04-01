import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import { Text } from '@nextui-org/react'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import { useEffect } from 'react'

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {}
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      secondary: '#697177',
    }
  }
})

function Footer () {
  return (
    <footer>
      <Text
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}
      >
       <a target='_blank' href='https://twitter.com/raveeshbhalla'>{' '}
        Built by @raveeshbhalla
        </a>
        <span style={{ marginLeft: '0.5rem', marginRight: '0.5rem' }}>{' '}|{' '}</span>
        <a target='_blank' href='https://cytation.substack.com/'>Subscribe for updates</a>
      </Text>
    </footer>
  )
}
export default function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    Router.events.on('routeChangeStart', NProgress.start)
    Router.events.on('routeChangeComplete', NProgress.done)
    Router.events.on('routeChangeError', NProgress.done)
    return () => {
      Router.events.off('routeChangeStart', NProgress.start)
      Router.events.off('routeChangeComplete', NProgress.done)
      Router.events.off('routeChangeError', NProgress.done)
    }
  }, [])
  return (
    <NextThemesProvider
      defaultTheme='system'
      attribute='class'
      value={{
        light: lightTheme.className,
        dark: darkTheme.className
      }}
    >
      <NextUIProvider>
        <Component props={pageProps} />
        <Analytics />
        <Footer />
      </NextUIProvider>
    </NextThemesProvider>
  )
}
