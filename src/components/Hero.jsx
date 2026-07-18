import { Link } from "react-router-dom"
import "./Hero.css"

export default function Hero({ series, firstEpisodeId }) {
  return (
    <section className="hero">
      <div className="hero__bg" style={{ backgroundImage: `url(${series.heroImage})` }} />
      <div className="hero__scrim" />
      <div className="container hero__content">
        <p className="eyebrow">
          {series.genres?.join(" · ")} {series.year ? `· ${series.year}` : ""}
        </p>
        <h1 className="hero__title">{series.title}</h1>
        {series.tagline && <p className="hero__tagline">{series.tagline}</p>}
        <p className="hero__synopsis">{series.synopsis}</p>
        <div className="hero__actions">
          {firstEpisodeId && (
            <Link to={`/ver/${firstEpisodeId}`} className="btn btn-primary">
              ▶ Ver ahora
            </Link>
          )}
          <Link to="/episodios" className="btn btn-ghost">
            Ver episodios
          </Link>
        </div>
      </div>
    </section>
  )
}
