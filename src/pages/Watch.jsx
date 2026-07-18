import { useParams, Link, Navigate } from "react-router-dom"
import VideoPlayer from "../components/VideoPlayer.jsx"
import { useCloudContent } from "../hooks/useCloudContent.js"
import "./Watch.css"

export default function Watch() {
  const { episodeId } = useParams()
  const { series, episodes } = useCloudContent()

  const sorted = [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)
  const index = sorted.findIndex((e) => e.id === episodeId)

  if (index === -1) {
    return <Navigate to="/episodios" replace />
  }

  const episode = sorted[index]
  const prev = sorted[index - 1]
  const next = sorted[index + 1]

  return (
    <main className="watch-page">
      <div className="container">
        <Link to="/episodios" className="watch-page__back">
          ← Volver a {series.title}
        </Link>

        <VideoPlayer src={episode.videoUrl} title={episode.title} episodeId={episode.id} />

        <div className="watch-page__info">
          <span className="eyebrow">
            Temporada {episode.season} · Episodio {episode.episode} · {episode.duration}
          </span>
          <h1 className="watch-page__title">{episode.title}</h1>
          <p className="watch-page__desc">{episode.description}</p>
        </div>

        <div className="watch-page__nav">
          {prev ? (
            <Link to={`/ver/${prev.id}`} className="btn btn-ghost">
              ← Anterior
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link to={`/ver/${next.id}`} className="btn btn-primary">
              Siguiente episodio →
            </Link>
          ) : (
            <span />
          )}
        </div>
      </div>
    </main>
  )
}
