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
    try {
      const data = await getYoutubeResults(url as string);
      res.status(200).json({ data })
    } catch (error) {
      res.status(500).json({ error: (error as Error).message })
      return;
    }
  }
}
