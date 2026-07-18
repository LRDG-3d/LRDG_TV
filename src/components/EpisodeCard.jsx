import { Link } from "react-router-dom"
import "./EpisodeCard.css"

export default function EpisodeCard({ episode }) {
  return (
    <Link to={`/ver/${episode.id}`} className="ep-card">
      <div className="ep-card__frame">
        <div className="ep-card__sprockets" aria-hidden="true" />
        <img src={episode.thumbnail} alt="" loading="lazy" className="ep-card__thumb" />
        <div className="ep-card__sprockets ep-card__sprockets--bottom" aria-hidden="true" />
        <div className="ep-card__play" aria-hidden="true">▶</div>
        <span className="ep-card__duration">{episode.duration}</span>
      </div>
      <div className="ep-card__meta">
        <span className="ep-card__num">E{String(episode.episode).padStart(2, "0")}</span>
        <h3 className="ep-card__title">{episode.title}</h3>
      </div>
    </Link>
  )
}
