import { Backlinks, Video } from '@/types/backlinks'
import axios from 'axios'

export const getYouTubeUrl = (video: Video) => {
  return `https://www.youtube.com/watch?v=${video.id.videoId}`
}

export const getYoutubeEmbed = (video: Video) => {
  return `<iframe src="https://www.youtube.com/embed/${video.id.videoId}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${video.snippet.title}" style="width: 100%; height: 100%;"></iframe>`
}

export const getYoutubeResults = async (url: string): Promise<Backlinks> => {
  const apiKey = process.env.YT_API
  let { data, error }: Backlinks = {}

  try {
    if (isShortenedUrl(url)) {
      url = await findRedirectUrl(url)
    }
    const matchResult = url
      .toString()
      .match(/arxiv\.org\/(?:pdf|abs)\/(\d+\.\d+)(?:\.pdf)?(?:\?.*)?$/)
    if (!matchResult) {
      throw new Error('Invalid arXiv URL')
    }
    const arxiv_id = matchResult[1]
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=arxiv.org%2Fpdf%2F${arxiv_id}%20OR%20arxiv.org%2Fabs%2F${arxiv_id}&type=video&order=relevance&videoEmbeddable=true&maxResults=5&key=${apiKey}`
    const response = await axios.get(apiUrl)
    data = response.data
  } catch (e) {
    if (e instanceof TypeError) {
      error = 'Invalid arXiv URL'
    } else {
      error = (e as Error).message
    }
  } finally {
    return { data, error }
  }
}

const isShortenedUrl = (url: string): boolean => {
  const shorteners = [
    'bit.ly',
    'tinyurl.com',
    'rebrand.ly',
    't.co',
    'goo.gl',
    'ow.ly',
    'buff.ly',
    'tiny.cc',
    'is.gd'
  ]

  const urlHostname = new URL(url).hostname
  return shorteners.some(shortener => urlHostname === shortener)
}

const findRedirectUrl = async (url: string): Promise<string> => {
  const response = await axios.head(url, { maxRedirects: 10 }) // Follow up to 10 redirects
  return response.request.res.responseUrl
}
