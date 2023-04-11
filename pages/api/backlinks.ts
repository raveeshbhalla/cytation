import type { NextApiRequest, NextApiResponse } from 'next'
import { getYoutubeResults } from '@/lib/yt'

export default async function handler (
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (!req.query.url) {
    res.status(400).json({ error: 'Missing URL' })
    return
  } else {
    const { url } = req.query;
    const videos = await getYoutubeResults(url);
    res.status(200).json({ videos })
  }
}
