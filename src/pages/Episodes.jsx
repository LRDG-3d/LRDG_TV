import { useMemo, useState } from "react"
import { Link } from "react-router-dom"
import { useCloudContent } from "../hooks/useCloudContent.js"
import "./Episodes.css"

export default function Episodes() {
  const { series, episodes } = useCloudContent()
  const [view, setView] = useState("list") // "list" (barras) | "large" (rectángulos grandes)

  // Lista de temporadas: usa las definidas en el admin y, si falta alguna,
  // agrega las que ya tengan episodios (por si acaso quedaron sueltas).
  const seasonNumbers = useMemo(() => {
    const fromSeries = (series.seasons || []).map((s) => s.number)
    const fromEpisodes = episodes.map((ep) => ep.season)
    return [...new Set([...fromSeries, ...fromEpisodes])].sort((a, b) => a - b)
  }, [series.seasons, episodes])

  const [selected, setSelected] = useState(seasonNumbers[0] ?? 1)
  const activeSeason = seasonNumbers.includes(selected) ? selected : seasonNumbers[0]

  const eps = episodes
    .filter((ep) => ep.season === activeSeason)
    .sort((a, b) => a.episode - b.episode)

  return (
    <main className="episodes-page">
      <div className="container">
        <p className="eyebrow">{series.title}</p>
        <h1 className="episodes-page__title">Episodios</h1>

        {seasonNumbers.length === 0 ? (
          <p className="episodes-page__empty">No hay episodios disponibles.</p>
        ) : (
          <>
            <div className="season-bar">
              <div className="season-bar__select-wrap">
                <select
                  className="season-bar__select"
                  value={activeSeason}
                  onChange={(e) => setSelected(Number(e.target.value))}
                >
                  {seasonNumbers.map((n) => {
                    const meta = (series.seasons || []).find((s) => s.number === n)
                    return (
                      <option key={n} value={n}>
                        {meta?.name || `Temporada ${n}`}
                      </option>
                    )
                  })}
                </select>
                <span className="season-bar__arrow" aria-hidden="true">▾</span>
              </div>

              <div className="view-toggle">
                <button
                  className={view === "list" ? "is-active" : ""}
                  onClick={() => setView("list")}
                  aria-label="Vista en barras"
                  title="Vista en barras"
                >
                  ☰
                </button>
                <button
                  className={view === "large" ? "is-active" : ""}
                  onClick={() => setView("large")}
                  aria-label="Vista en rectángulos grandes"
                  title="Vista en rectángulos grandes"
                >
                  ▭
                </button>
              </div>
            </div>

            {eps.length === 0 ? (
              <p className="episodes-page__empty">No hay episodios disponibles.</p>
            ) : view === "list" ? (
              <ul className="ep-row-list">
                {eps.map((ep) => (
                  <li key={ep.id} className="ep-row">
                    <Link to={`/ver/${ep.id}`} className="ep-row__thumb-link">
                      <img src={ep.thumbnail} alt="" loading="lazy" className="ep-row__thumb" />
                      <span className="ep-row__play" aria-hidden="true">▶</span>
                    </Link>
                    <Link to={`/ver/${ep.id}`} className="ep-row__body">
                      <span className="ep-row__num">EP. {ep.episode}</span>
                      <h3 className="ep-row__title">{ep.title}</h3>
                      <div className="ep-row__meta">
                        <span className="ep-row__duration">{ep.duration}</span>
                        {ep.category && <span className="ep-row__category">{ep.category}</span>}
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="ep-large-list">
                {eps.map((ep) => (
                  <li key={ep.id} className="ep-large">
                    <Link to={`/ver/${ep.id}`} className="ep-large__thumb-link">
                      <img src={ep.thumbnail} alt="" loading="lazy" className="ep-large__thumb" />
                      <span className="ep-large__play" aria-hidden="true">▶</span>
                      <span className="ep-large__duration">{ep.duration}</span>
                    </Link>
                    <Link to={`/ver/${ep.id}`} className="ep-large__body">
                      <span className="ep-large__num">EP. {ep.episode}</span>
                      <h3 className="ep-large__title">{ep.title}</h3>
                      {ep.category && <span className="ep-row__category">{ep.category}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            )}
          </>
        )}
      </div>
    </main>
  )
}
