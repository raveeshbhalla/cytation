import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Input, Button, Container, Row, Col, Grid } from '@nextui-org/react'
import { useRouter } from 'next/router'

const inter = Inter({ subsets: ['latin'] })

const IndexPage = () => {
  const router = useRouter()
  const [url, setUrl] = useState('')

  const handleSearch = async () => {
    router.push(`/search?url=${encodeURIComponent(url)}`)
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
              <Row justify='center' align='center'>
                <Input
                  fullWidth
                  clearable
                  placeholder='Find YouTube videos that cite an arXiv paper'
                  value={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </Row>
              <Row justify='center' align='center'>
                <Button type='submit' onClick={handleSearch}>
                  Search
                </Button>
              </Row>
            </form>
          </Container>
        </div>
      </main>
    </div>
  )
}

export default IndexPage
