import { useState } from "react"
import EpisodeCard from "../components/EpisodeCard.jsx"
import { useCloudContent } from "../hooks/useCloudContent.js"
import "./Search.css"

export default function Search() {
  const { episodes } = useCloudContent()
  const [query, setQuery] = useState("")

  const q = query.trim().toLowerCase()
  const results = q
    ? episodes.filter(
        (ep) => ep.title?.toLowerCase().includes(q) || ep.description?.toLowerCase().includes(q)
      )
    : [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)

  return (
    <main className="search-page">
      <div className="container">
        <input
          type="search"
          className="search-page__input"
          placeholder="Buscar episodios…"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          autoFocus
        />

        {results.length === 0 ? (
          <p className="search-page__empty">
            {q ? `Sin resultados para "${query}".` : "Todavía no hay episodios disponibles."}
          </p>
        ) : (
          <div className="search-page__grid">
            {results.map((ep) => (
              <EpisodeCard key={ep.id} episode={ep} />
            ))}
          </div>
        )}
      </div>
    </main>
  )
}
