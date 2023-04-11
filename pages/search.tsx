import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import {
  Input,
  Text,
  Spacer,
  Row,
  Container
} from '@nextui-org/react'
import Result from '../components/result'
import { getYoutubeResults, getYouTubeUrl } from '../lib/yt'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import Shortcut from '@/components/shortcut'
import handleSearch from '@/lib/handle_search'
import { Video } from '@/types/backlinks'

const inter = Inter({ subsets: ['latin'] })

type SRPProps = {
  props: {
    videos: Video[]
    error: string
    query: string
  }
}

const SRP:React.FC<SRPProps> = ({ props }) => {
  const router = useRouter();
  const [url, setUrl] = useState(props.query);
  const { videos, error } = props;

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
            alignItems: 'center',
            height: '100vh'
          }}
        >
          <Container xs alignContent='center'>
            <div>
              <form
                onSubmit={e => {
                  e.preventDefault()
                  handleSearch(router, url)
                }}
              >
                <Input
                  fullWidth
                  clearable
                  placeholder='Enter arXiv paper URL'
                  initialValue={url}
                  onChange={e => setUrl(e.target.value)}
                />
              </form>
              <Spacer y={1} />
              {error ? (
                <div>
                  <Text h3>{error}</Text>
                </div>
              ) : null}
              {videos && videos.length > 0 ? (
                <div>
                  <Text h3>Top Cytation</Text>
                  <Spacer y={1} />
                  <Result video={videos[0]} />
                  <Spacer y={2} />
                  <Text h3>Other Cytations</Text>
                  {videos.slice(1).map(video => (
                    <Row key={video.id.videoId}>
                      <a href={getYouTubeUrl(video)} target='_blank'>
                        <Text
                          color='#8ab4f8'
                          dangerouslySetInnerHTML={{
                            __html: video.snippet.title
                          }}
                        />
                      </a>
                    </Row>
                  ))}
                </div>
              ) : null}
            </div>
          </Container>

          <Spacer y={2} />
          <Shortcut />
        </div>
      </main>
    </div>
  )
}

export default SRP

export const getServerSideProps: GetServerSideProps = async context => {
  const { query } = context
  const { url } = query
  const videos = await getYoutubeResults(url)
  let error = ''
  if (!videos) {
    error = 'Error fetching videos'
  } else if (videos.length === 0) {
    error = 'No videos found'
  }
  return {
    props: {
      videos,
      query: url as string,
      error
    }
  }
}
