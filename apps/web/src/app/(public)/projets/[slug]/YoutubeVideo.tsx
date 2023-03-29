const videoIdFromUrl = (url: string) => {
  const regExp = /.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#&?]*).*/
  const match = url.match(regExp)

  return match ? match[1] : undefined
}

export const YoutubeVideo = ({ url }: { url: string }) => {
  const videoId = videoIdFromUrl(url)

  if (!videoId) {
    return null
  }
  // Embed youtube without tracking
  const src = `https://www.youtube-nocookie.com/embed/${videoId}`

  return (
    <iframe
      width="100%"
      height="420px"
      src={src}
      frameBorder="0"
      allow="autoplay; encrypted-media"
      allowFullScreen
    />
  )
}
