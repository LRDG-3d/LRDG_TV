import { useRef } from "react"
import "./VideoPlayer.css"

export default function VideoPlayer({ src, title }) {
  const videoRef = useRef(null)

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
      >
        Tu navegador no soporta la reproducción de video HTML5.
      </video>
    </div>
  )
}
