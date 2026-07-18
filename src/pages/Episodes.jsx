import { Link } from "react-router-dom"
import { useSeriesData } from "../hooks/useSeriesData.js"
import "./Episodes.css"

function groupBySeason(episodes) {
  const map = new Map()
  for (const ep of episodes) {
    if (!map.has(ep.season)) map.set(ep.season, [])
    map.get(ep.season).push(ep)
  }
  return [...map.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([season, eps]) => [season, eps.sort((a, b) => a.episode - b.episode)])
}

function formatDate(dateStr) {
  if (!dateStr) return ""
  try {
    return new Date(dateStr).toLocaleDateString("es-ES", { year: "numeric", month: "short", day: "numeric" })
  } catch {
    return dateStr
  }
}

export default function Episodes() {
  const { series, episodes } = useSeriesData()
  const seasons = groupBySeason(episodes)

  return (
    <main className="episodes-page">
      <div className="container">
        <p className="eyebrow">{series.title}</p>
        <h1 className="episodes-page__title">Episodios</h1>

        {seasons.length === 0 && (
          <p className="episodes-page__empty">
            Todavía no hay episodios. Añádelos desde el <Link to="/admin">panel de administración</Link> o edita{" "}
            <code>src/data/seriesData.js</code>.
          </p>
        )}

        {seasons.map(([season, eps]) => (
          <section key={season} className="season-block">
            <h2 className="season-block__title">Temporada {season}</h2>
            <ul className="ep-row-list">
              {eps.map((ep) => (
                <li key={ep.id} className="ep-row">
                  <Link to={`/ver/${ep.id}`} className="ep-row__thumb-link">
                    <img src={ep.thumbnail} alt="" loading="lazy" className="ep-row__thumb" />
                    <span className="ep-row__play" aria-hidden="true">▶</span>
                  </Link>
                  <div className="ep-row__body">
                    <div className="ep-row__top">
                      <span className="ep-row__num">
                        S{String(ep.season).padStart(2, "0")}E{String(ep.episode).padStart(2, "0")}
                      </span>
                      <span className="ep-row__date">{formatDate(ep.date)}</span>
                    </div>
                    <h3 className="ep-row__title">{ep.title}</h3>
                    <p className="ep-row__desc">{ep.description}</p>
                  </div>
                  <div className="ep-row__side">
                    <span className="ep-row__duration">{ep.duration}</span>
                    <Link to={`/ver/${ep.id}`} className="btn btn-ghost ep-row__btn">
                      Reproducir
                    </Link>
                  </div>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  )
}
