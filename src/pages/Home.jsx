import EpisodeCard from "../components/EpisodeCard.jsx"
import { useSeriesData } from "../hooks/useSeriesData.js"
import "./Home.css"

export default function Home() {
  const { episodes } = useSeriesData()
  const sorted = [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)

  return (
    <main className="home-page">
      <div className="container">
        {sorted.length === 0 ? (
          <p className="home-page__empty">Todavía no hay episodios disponibles.</p>
        ) : (
          <div className="home-grid">
            {sorted.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
