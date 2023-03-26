import Head from 'next/head'
import { Inter } from 'next/font/google'
import styles from '../styles/Home.module.css';
import { useState } from "react";
import axios from "axios";
import { Input, Button, Text, Spacer, Container, Row, Grid } from '@nextui-org/react';
import Result from '../components/result';

const inter = Inter({ subsets: ['latin'] })

const IndexPage = () => {
  const [url, setUrl] = useState("");
  const [searching, setSearching] = useState<boolean>(false);
  const [videos, setVideos] = useState<string[]>([]);
  const [error, setError] = useState<string>('');

  const handleSearch = async() => {
    setSearching(true);
    setError('');
    setVideos([]);
    const { data } = await axios.get(`/api/backlinks?url=${encodeURIComponent(url)}`);
    if (data.error) {
      setError(data.error);
    } else if (data.videos.length === 0) {
      setError('No backlinks found');
    } else {
      setVideos(data.videos);
    }
    setSearching(false);
  };

  return (
    <div className={styles.container}>
    <Head>
        <title>Cytations</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main, inter.className}>
    <div>
      <Grid.Container>
        <Grid>
        <Input fullWidth
          placeholder="Enter arXiv paper URL"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />
        </Grid>
        <Grid>
        <Button disabled={searching} onClick={handleSearch}>Search</Button>
        </Grid>
      </Grid.Container>
      <Spacer y={1} />
      {error ? (
        <div>
          <Text h3>Error: {error}</Text>
        </div>
      ) : null }
      {videos && videos.length > 0 ? (
        <div>
          <Text h3>Top Cytation</Text>
          <Spacer y={1} />
          <Result video={videos[0]} />
          <Spacer y={2} />
          <Text h3>Other Cytations</Text>
          {videos.slice(1).map((video) => (
            <Row>
              <a href={getYouTubeUrl(video)} target="_blank" rel="noreferrer">
              <Text color='blue' dangerouslySetInnerHTML={{ __html: video.snippet.title }}/>
              </a>
            </Row> 
          ))}
        </div>
        ) : null}

  </div>
  </main>
  </div>
  );
};

export default IndexPage;
