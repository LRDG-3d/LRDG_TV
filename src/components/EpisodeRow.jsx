import { Link } from "react-router-dom"
import { DEFAULT_THUMBNAIL } from "../constants.js"
import "./EpisodeRow.css"

export default function EpisodeRow({ episode, meta }) {
  return (
    <Link to={`/ver/${episode.id}`} className="episode-row">
      <img src={episode.thumbnail || DEFAULT_THUMBNAIL} alt="" loading="lazy" className="episode-row__thumb" />
      <div className="episode-row__info">
        <h3>{episode.title}</h3>
        <span>{meta}</span>
      </div>
    </Link>
  )
}
