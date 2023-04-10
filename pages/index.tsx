import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useEffect, useRef, useState } from 'react'
import { Input, Button, Container, Row, Text, Spacer } from '@nextui-org/react'
import { useRouter } from 'next/router'
import * as gtag from '../lib/analytics'
import Shortcut from '@/components/shortcut'

const inter = Inter({ subsets: ['latin'] })

const IndexPage = () => {
  const inputRef = useRef<HTMLInputElement>(null)
  useEffect(() => {
    inputRef.current?.focus()
  }, [])
  const router = useRouter()
  const [url, setUrl] = useState('')

  const handleSearch = async () => {
    gtag.event({
      action: 'search',
      category: 'submit',
      label: url,
    });

    router.push(`/search?url=${encodeURIComponent(url)}`);
  }

  return (
    <div>
      <Head>
        <title>Cytations</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={inter.className}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <Container xs alignContent='center'>
            <form
              onSubmit={e => {
                e.preventDefault()
                handleSearch()
              }}
            >
              <Text
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                color='secondary'
              >
                Find YouTube videos that cite an arXiv paper
              </Text>
              <Spacer y={0.5} />
              <Row justify='center' align='center'>
                <Input
                  fullWidth
                  clearable
                  placeholder='Enter arXiv URL'
                  value={url}
                  ref={inputRef}
                  onChange={e => setUrl(e.target.value)}
                />
              </Row>
              <Spacer y={0.5} />
              <Row justify='center' align='center'>
                <Button type='submit' onClick={handleSearch}>
                  Search
                </Button>
              </Row>
            </form>
          </Container>
          <Spacer y={2} />
          <Shortcut />
        </div>
      </main>
    </div>
  )
}

export default IndexPage
