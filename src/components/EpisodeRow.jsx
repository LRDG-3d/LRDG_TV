import { Link } from "react-router-dom"
import "./EpisodeRow.css"

export default function EpisodeRow({ episode, meta }) {
  return (
    <Link to={`/ver/${episode.id}`} className="episode-row">
      <img src={episode.thumbnail} alt="" loading="lazy" className="episode-row__thumb" />
      <div className="episode-row__info">
        <h3>{episode.title}</h3>
        <span>{meta}</span>
      </div>
    </Link>
  )
}
