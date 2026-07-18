import { useState } from "react"
import { useSeriesData } from "../hooks/useSeriesData.js"
import "./Admin.css"

const emptyForm = {
  id: "",
  season: 1,
  episode: 1,
  title: "",
  description: "",
  thumbnail: "",
  videoUrl: "",
  duration: "",
  date: "",
}

function generateCode(series, episodes) {
  const sorted = [...episodes].sort((a, b) => a.season - b.season || a.episode - b.episode)
  return `export const series = ${JSON.stringify(series, null, 2)}

export const episodes = ${JSON.stringify(sorted, null, 2)}
`
}

function download(filename, text) {
  const blob = new Blob([text], { type: "text/plain;charset=utf-8" })
  const url = URL.createObjectURL(blob)
  const a = document.createElement("a")
  a.href = url
  a.download = filename
  a.click()
  URL.revokeObjectURL(url)
}

export default function Admin() {
  const { series, episodes, saveOverrides, resetOverrides, hasLocalChanges } = useSeriesData()
  const [tab, setTab] = useState("episodes")
  const [seriesForm, setSeriesForm] = useState(series)
  const [epForm, setEpForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [copied, setCopied] = useState(false)

  function persist(nextSeries, nextEpisodes) {
    saveOverrides({ series: nextSeries, episodes: nextEpisodes })
  }

  function handleSeriesSubmit(e) {
    e.preventDefault()
    persist(seriesForm, episodes)
  }

  function handleEpisodeSubmit(e) {
    e.preventDefault()
    const id = epForm.id || `s${String(epForm.season).padStart(2, "0")}e${String(epForm.episode).padStart(2, "0")}`
    const next = { ...epForm, id }

    let updated
    if (editingId) {
      updated = episodes.map((ep) => (ep.id === editingId ? next : ep))
    } else {
      updated = [...episodes.filter((ep) => ep.id !== id), next]
    }
    persist(seriesForm, updated)
    setEpForm(emptyForm)
    setEditingId(null)
  }

  function editEpisode(ep) {
    setEpForm(ep)
    setEditingId(ep.id)
    window.scrollTo({ top: 0, behavior: "smooth" })
  }

  function deleteEpisode(id) {
    if (!confirm("¿Eliminar este episodio? Esta acción solo afecta a tu borrador local.")) return
    persist(seriesForm, episodes.filter((ep) => ep.id !== id))
  }

  function handleCopyCode() {
    const code = generateCode(seriesForm, episodes)
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <main className="admin-page">
      <div className="container">
        <p className="eyebrow">Panel de administración</p>
        <h1 className="admin-page__title">Editar contenido</h1>

        <div className="admin-page__notice">
          <strong>GitHub Pages es un sitio estático:</strong> no existe una base de datos ni un servidor, así
          que estos cambios se guardan solo en el <em>localStorage</em> de este navegador y no se publican
          automáticamente para tus visitantes. Cuando termines de editar, usa <strong>“Copiar código”</strong>{" "}
          o <strong>“Descargar JSON”</strong> y pega el resultado en{" "}
          <code>src/data/seriesData.js</code>, luego haz commit y push para publicar los cambios de verdad.
        </div>

        <div className="admin-page__tabs">
          <button className={tab === "episodes" ? "is-active" : ""} onClick={() => setTab("episodes")}>
            Episodios
          </button>
          <button className={tab === "series" ? "is-active" : ""} onClick={() => setTab("series")}>
            Datos de la serie
          </button>
        </div>

        {tab === "series" && (
          <form className="admin-form" onSubmit={handleSeriesSubmit}>
            <label>
              Título
              <input
                value={seriesForm.title}
                onChange={(e) => setSeriesForm({ ...seriesForm, title: e.target.value })}
              />
            </label>
            <label>
              Eslogan
              <input
                value={seriesForm.tagline}
                onChange={(e) => setSeriesForm({ ...seriesForm, tagline: e.target.value })}
              />
            </label>
            <label className="admin-form__full">
              Sinopsis
              <textarea
                rows={4}
                value={seriesForm.synopsis}
                onChange={(e) => setSeriesForm({ ...seriesForm, synopsis: e.target.value })}
              />
            </label>
            <label className="admin-form__full">
              Imagen del hero (URL)
              <input
                value={seriesForm.heroImage}
                onChange={(e) => setSeriesForm({ ...seriesForm, heroImage: e.target.value })}
              />
            </label>
            <label>
              Año
              <input value={seriesForm.year} onChange={(e) => setSeriesForm({ ...seriesForm, year: e.target.value })} />
            </label>
            <label>
              Clasificación
              <input
                value={seriesForm.rating}
                onChange={(e) => setSeriesForm({ ...seriesForm, rating: e.target.value })}
              />
            </label>
            <button type="submit" className="btn btn-primary admin-form__submit">
              Guardar datos de la serie
            </button>
          </form>
        )}

        {tab === "episodes" && (
          <>
            <form className="admin-form" onSubmit={handleEpisodeSubmit}>
              <label>
                Temporada
                <input
                  type="number"
                  min="1"
                  value={epForm.season}
                  onChange={(e) => setEpForm({ ...epForm, season: Number(e.target.value) })}
                />
              </label>
              <label>
                Número de episodio
                <input
                  type="number"
                  min="1"
                  value={epForm.episode}
                  onChange={(e) => setEpForm({ ...epForm, episode: Number(e.target.value) })}
                />
              </label>
              <label className="admin-form__full">
                Título
                <input
                  required
                  value={epForm.title}
                  onChange={(e) => setEpForm({ ...epForm, title: e.target.value })}
                />
              </label>
              <label className="admin-form__full">
                Descripción
                <textarea
                  rows={3}
                  value={epForm.description}
                  onChange={(e) => setEpForm({ ...epForm, description: e.target.value })}
                />
              </label>
              <label>
                Miniatura (URL)
                <input
                  value={epForm.thumbnail}
                  onChange={(e) => setEpForm({ ...epForm, thumbnail: e.target.value })}
                />
              </label>
              <label>
                URL del video
                <input
                  required
                  value={epForm.videoUrl}
                  onChange={(e) => setEpForm({ ...epForm, videoUrl: e.target.value })}
                />
              </label>
              <label>
                Duración (ej. 42:00)
                <input
                  value={epForm.duration}
                  onChange={(e) => setEpForm({ ...epForm, duration: e.target.value })}
                />
              </label>
              <label>
                Fecha
                <input
                  type="date"
                  value={epForm.date}
                  onChange={(e) => setEpForm({ ...epForm, date: e.target.value })}
                />
              </label>

              {epForm.thumbnail && (
                <div className="admin-form__preview">
                  <span>Vista previa</span>
                  <img src={epForm.thumbnail} alt="" />
                </div>
              )}

              <div className="admin-form__full admin-form__actions">
                <button type="submit" className="btn btn-primary">
                  {editingId ? "Guardar cambios del episodio" : "Añadir episodio"}
                </button>
                {editingId && (
                  <button
                    type="button"
                    className="btn btn-ghost"
                    onClick={() => {
                      setEpForm(emptyForm)
                      setEditingId(null)
                    }}
                  >
                    Cancelar edición
                  </button>
                )}
              </div>
            </form>

            <h2 className="admin-page__subtitle">Episodios ({episodes.length})</h2>
            <ul className="admin-list">
              {[...episodes]
                .sort((a, b) => a.season - b.season || a.episode - b.episode)
                .map((ep) => (
                  <li key={ep.id} className="admin-list__item">
                    <img src={ep.thumbnail} alt="" className="admin-list__thumb" />
                    <div className="admin-list__body">
                      <span className="admin-list__num">
                        S{String(ep.season).padStart(2, "0")}E{String(ep.episode).padStart(2, "0")}
                      </span>
                      <strong>{ep.title}</strong>
                    </div>
                    <div className="admin-list__actions">
                      <button className="btn btn-ghost" onClick={() => editEpisode(ep)}>
                        Editar
                      </button>
                      <button className="btn btn-ghost" onClick={() => deleteEpisode(ep.id)}>
                        Eliminar
                      </button>
                    </div>
                  </li>
                ))}
            </ul>
          </>
        )}

        <div className="admin-page__export">
          <h2 className="admin-page__subtitle">Publicar tus cambios</h2>
          <div className="admin-page__export-actions">
            <button className="btn btn-primary" onClick={handleCopyCode}>
              {copied ? "¡Código copiado!" : "Copiar código de seriesData.js"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => download("seriesData.json", JSON.stringify({ series: seriesForm, episodes }, null, 2))}
            >
              Descargar JSON
            </button>
            {hasLocalChanges && (
              <button className="btn btn-ghost" onClick={resetOverrides}>
                Restablecer borrador local
              </button>
            )}
          </div>
          <p className="admin-page__hint">
            Pega el código copiado dentro de <code>src/data/seriesData.js</code>, reemplazando su contenido
            actual, luego haz <code>git add . && git commit -m "actualizar episodios" && git push</code> para
            publicarlo en GitHub Pages.
          </p>
        </div>
      </div>
    </main>
  )
}
