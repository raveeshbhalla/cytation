import Script from 'next/script'
import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react'
import { createTheme, NextUIProvider } from '@nextui-org/react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import Router from 'next/router'
import { useEffect } from 'react'
import * as gtag from '../lib/analytics'
import Footer from '../components/footer'

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {}
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
    colors: {
      secondary: '#697177'
    }
  }
})

export default function App ({ Component, pageProps }: AppProps) {
  useEffect(() => {
    const handleRouteChange = (url: string) => {
      gtag.pageview(url)
    }
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
    <>
      <Script
        async
        src={`https://www.googletagmanager.com/gtag/js?id={process.env.NEXT_PUBLIC_GA_ID`}
      />
      <Script dangerouslySetInnerHTML={{__html: gtag.headScript}}/>
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
    </>
  )
}
