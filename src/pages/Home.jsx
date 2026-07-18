import { useCloudContent } from "../hooks/useCloudContent.js"
import { useWatchHistory } from "../hooks/useWatchHistory.js"
import EpisodeRow from "../components/EpisodeRow.jsx"
import "./Home.css"

export default function Home() {
  const { episodes } = useCloudContent()
  const { history } = useWatchHistory()

  const sorted = [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)

  const continueWatching = sorted
    .filter((ep) => {
      const h = history[ep.id]
      return h && !h.watched && h.progress > 5
    })
    .sort((a, b) => (history[b.id]?.lastWatchedAt ?? 0) - (history[a.id]?.lastWatchedAt ?? 0))

  const watched = sorted
    .filter((ep) => history[ep.id]?.watched)
    .sort((a, b) => (history[b.id]?.lastWatchedAt ?? 0) - (history[a.id]?.lastWatchedAt ?? 0))

  // Episodios más recientes que agregaste desde el admin (los últimos en la lista).
  const newest = [...episodes].slice(-8).reverse()

  const hasAny = continueWatching.length > 0 || watched.length > 0 || newest.length > 0

  return (
    <main className="home-page">
      <div className="container">
        {!hasAny && <p className="home-page__empty">Todavía no hay episodios disponibles.</p>}

        {continueWatching.length > 0 && (
          <section className="home-section">
            <h2>Seguir viendo</h2>
            <div className="home-section__list">
              {continueWatching.map((ep) => (
                <EpisodeRow key={ep.id} episode={ep} meta={`Episodio ${ep.episode}`} />
              ))}
            </div>
          </section>
        )}

        {newest.length > 0 && (
          <section className="home-section">
            <h2>Episodios nuevos</h2>
            <div className="home-section__list">
              {newest.map((ep) => (
                <EpisodeRow key={ep.id} episode={ep} meta={`Episodio ${ep.episode}`} />
              ))}
            </div>
          </section>
        )}

        {watched.length > 0 && (
          <section className="home-section">
            <h2>Vistos</h2>
            <div className="home-section__list">
              {watched.map((ep) => (
                <EpisodeRow key={ep.id} episode={ep} meta={`Episodio ${ep.episode}`} />
              ))}
            </div>
          </section>
        )}
      </div>
    </main>
  )
}
