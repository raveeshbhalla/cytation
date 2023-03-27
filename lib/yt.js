import axios from "axios";

export const getYouTubeUrl = (video) => {
    return `https://www.youtube.com/watch?v=${video.id.videoId}`;
}

export const getYoutubeEmbed = (video) => {
    return `<iframe src="https://www.youtube.com/embed/${video.id.videoId}?feature=oembed" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen title="${video.snippet.title}" style="width: 100%; height: 100%;"></iframe>`;
  };
  

export const getYoutubeResults = async (url) => {
    const apiKey = process.env.YT_API; // Replace with your own API key
    const arxiv_id = url.toString().match(/arxiv\.org\/(pdf|abs)\/(.*)/)[2];
    const apiUrl = `https://www.googleapis.com/youtube/v3/search?part=snippet&q=arxiv.org%2Fpdf%2F${arxiv_id}%20OR%20arxiv.org%2Fabs%2F${arxiv_id}&type=video&order=relevance&videoEmbeddable=true&maxResults=5&key=${apiKey}`;
    const response = await axios.get(apiUrl);

    return response.data.items;
}