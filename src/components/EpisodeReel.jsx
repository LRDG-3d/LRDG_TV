import EpisodeCard from "./EpisodeCard.jsx"
import "./EpisodeReel.css"

export default function EpisodeReel({ title, episodes }) {
  return (
    <section className="reel">
      <div className="container">
        <h2 className="reel__title">{title}</h2>
      </div>
      <div className="reel__track container">
        {episodes.map((ep) => (
          <EpisodeCard key={ep.id} episode={ep} />
        ))}
      </div>
    </section>
  )
}
