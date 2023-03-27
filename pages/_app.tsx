import '@/styles/globals.css'
import type { AppProps } from 'next/app'
import { Analytics } from '@vercel/analytics/react';
import { createTheme, NextUIProvider } from "@nextui-org/react"
import { ThemeProvider as NextThemesProvider } from 'next-themes';

// 2. Call `createTheme` and pass your custom values
const lightTheme = createTheme({
  type: 'light',
  theme: {
    
  }
})

const darkTheme = createTheme({
  type: 'dark',
  theme: {
  }
})

export default function App({ Component, pageProps }: AppProps) {
  return <NextThemesProvider
            defaultTheme="system"
            attribute="class"
            value={{
            light: lightTheme.className,
            dark: darkTheme.className
            }}
            >
            <NextUIProvider>
                <Component props={pageProps} />
                <Analytics />
            </NextUIProvider>
            </NextThemesProvider>
}
