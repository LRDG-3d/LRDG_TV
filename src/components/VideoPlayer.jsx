import { useRef, useEffect } from "react"
import { useWatchHistory } from "../hooks/useWatchHistory.js"
import "./VideoPlayer.css"

export default function VideoPlayer({ src, title, episodeId }) {
  const videoRef = useRef(null)
  const lastSaveRef = useRef(0)
  const { history, saveProgress } = useWatchHistory()

  useEffect(() => {
    const video = videoRef.current
    if (!video || !episodeId) return
    const saved = history[episodeId]

    function resume() {
      if (saved?.progress && !saved.watched) {
        video.currentTime = saved.progress
      }
      video.removeEventListener("loadedmetadata", resume)
    }
    video.addEventListener("loadedmetadata", resume)
    return () => video.removeEventListener("loadedmetadata", resume)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [episodeId])

  function handleTimeUpdate(e) {
    const now = Date.now()
    if (now - lastSaveRef.current > 4000) {
      lastSaveRef.current = now
      saveProgress(episodeId, e.target.currentTime, e.target.duration)
    }
  }

  function handleEnded(e) {
    saveProgress(episodeId, e.target.duration, e.target.duration)
  }

  return (
    <div className="player">
      <video
        ref={videoRef}
        className="player__video"
        src={src}
        controls
        playsInline
        preload="metadata"
        aria-label={title}
        onTimeUpdate={handleTimeUpdate}
        onEnded={handleEnded}
      >
        Tu navegador no soporta la reproducción de video HTML5.
      </video>
    </div>
  )
}
