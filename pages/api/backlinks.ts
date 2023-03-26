import type { NextApiRequest, NextApiResponse } from "next";
import { google } from "googleapis";

const youtube = google.youtube({
  version: "v3",
  auth: process.env.YT_API // Replace with your own API key
});

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const { url } = req.query;
  const arxiv_id = url.toString().match(/arxiv\.org\/(pdf|abs)\/(.*)/)[2];

  const searchResult = await youtube.search.list({
    part: "snippet",
    q:`arxiv.org/pdf/${arxiv_id} OR arxiv.org/abs/${arxiv_id}`,
    type: "video",
    order: "relevance",
    videoEmbeddable: "true",
    maxResults: 5
  });

  const videos = searchResult.data.items;
  res.status(200).json({ videos });
}
