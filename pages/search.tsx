import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import { Card, Input, Button, Text } from '@nextui-org/react';
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css';
import axios from "axios";
import { getYoutubeEmbed } from '@/lib/yt';
import Head from 'next/head';

type SearchProps = {
    initVideos: [],
    initError: ''
}

export default function Search( props: SearchProps ) {
    const router = useRouter()
    const [videos, setVideos] = useState(props.initVideos || [])
    const [search, setSearch] = useState(router.query.q || '')
    const [error, setError] = useState<string>(props.initError || '');

    return (
        <div className={styles.container}>
    <Head>
        <title>Backlinkify</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main, inter.className}>
    <div>
      <Card className={styles.searchContainer}>
        <Input
          placeholder="Enter arXiv paper URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        <Button disabled={searching} onClick={handleSearch}>Search</Button>
      </Card>
      {error ? (
        <div>
          <Text h3>Error: {error}</Text>
        </div>
      ) : null }
      {videos && videos.length > 0 ? (
        <div>
          <Text h3>Backlinks:</Text>
          {videos.map((video) => (
            <div key={video.id.videoId}>
              <Text h4 dangerouslySetInnerHTML={{ __html: video.snippet.title }}/>
              <div dangerouslySetInnerHTML={{ __html: getYoutubeEmbed(video) }} />
            </div>
            ))}
        </div>
        ) : null}

  </div>
  </main>
  </div>
    )
}

export async function getServerSideProps(context) {
    const { q } = context.query
    const host = context.req.headers.host;
    const { data } = await axios.get(`http://${host}/api/backlinks?url=${encodeURIComponent(q)}`);
    return {
        props: {
            videos: data.videos,
            error: data.error || ''
        }
    }
}

    
