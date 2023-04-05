import Head from 'next/head'
import { Inter } from 'next/font/google'
import { useState } from 'react'
import { Input, Button, Text, Spacer, Row, Grid, Container } from '@nextui-org/react'
import Result from '../components/result'
import { getYoutubeResults, getYouTubeUrl } from '../lib/yt'
import { useRouter } from 'next/router'
import { GetServerSideProps } from 'next'
import ReactGA from 'react-ga'
import { logEvent } from '@/lib/analytics'

const inter = Inter({ subsets: ['latin'] })

type SRPProps = {
  videos: any
  error: string
  query: string
}

const SRP = ({ props }: SRPProps) => {
  const router = useRouter();
  const [url, setUrl] = useState(props.query);
  const { videos, error, query } = props;
  const handleSearch = async () => {
    logEvent('Search', 'submit', url);
    router.push(`/search?url=${encodeURIComponent(url)}`);
  };

  return (
    <div>
      <Head>
        <title>Cytations</title>
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={inter.className}>
      <Container xs alignContent='center'>
        <div>
          <form onSubmit={e => {
            e.preventDefault()
            handleSearch()
          }}>
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
                  <ReactGA.OutboundLink
                  eventLabel="ytResult"
                  to={getYouTubeUrl(video)}
                  target="_blank"
                  >
                    <Text
                      color='#8ab4f8'
                      dangerouslySetInnerHTML={{ __html: video.snippet.title }}
                    />
                  </ReactGA.OutboundLink>
                </Row>
              ))}
            </div>
          ) : null}
        </div>
        </Container>
      </main>
    </div>
  )
}

export default SRP

export const getServerSideProps: GetServerSideProps<SRPProps> = async(context) => {
  const { query } = context;
  const { url } = query;
  const videos = await getYoutubeResults(url);
  let error = '';
  if (!videos) {
    error = 'Error fetching videos';
  } else if (videos.length === 0) {
    error = 'No videos found';
  }
  return {
    props: {
      videos,
      query: url as string,
      error
    }
  }
}
