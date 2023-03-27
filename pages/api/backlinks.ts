import type { NextApiRequest, NextApiResponse } from 'next'
import { google } from 'googleapis'
import { getYoutubeResults } from '@/lib/yt'

const youtube = google.youtube({
  version: 'v3',
  auth: process.env.YT_API // Replace with your own API key
})

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.url) {
    res.status(400).json({ error: 'Missing URL' })
    return
  } else {
    const { url } = req.query;
    const videos = getYoutubeResults(url);
    res.status(200).json({ videos })
  }
}
