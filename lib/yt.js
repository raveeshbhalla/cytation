export const getYouTubeUrl = (video) => {
    return `https://www.youtube.com/watch?v=${video.id.videoId}`;
}

export const getYoutubeEmbed = (video) => {
    return `<iframe width=\"360\" height=\"202\" src=\"https://www.youtube.com/embed/${video.id.videoId}?feature=oembed\" frameborder=\"0\" allow=\"accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share\" allowfullscreen title=\"${video.snippet.title}\"></iframe>`;
}