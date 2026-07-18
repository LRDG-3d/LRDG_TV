import { useEffect, useState } from "react"
import { useCloudContent } from "../hooks/useCloudContent.js"
import { useAuth } from "../hooks/useAuth.js"
import Login from "./Login.jsx"
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
  const { user, loading, login, logout } = useAuth()
  const { series, episodes, loading: contentLoading, publish } = useCloudContent()
  const [tab, setTab] = useState("episodes")
  const [seriesForm, setSeriesForm] = useState(series)
  const [epForm, setEpForm] = useState(emptyForm)
  const [editingId, setEditingId] = useState(null)
  const [copied, setCopied] = useState(false)
  const [status, setStatus] = useState("idle") // idle | saving | saved | error

  useEffect(() => {
    if (!contentLoading) setSeriesForm(series)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contentLoading])

  if (loading) {
    return (
      <main className="admin-page">
        <div className="container" />
      </main>
    )
  }

  if (!user) {
    return <Login onLogin={login} />
  }


  async function persist(nextSeries, nextEpisodes) {
    setStatus("saving")
    try {
      await publish(nextSeries, nextEpisodes)
      setStatus("saved")
      setTimeout(() => setStatus("idle"), 2000)
    } catch (err) {
      console.error(err)
      setStatus("error")
    }
  }

  function handleSeriesSubmit(e) {
    e.preventDefault()
    persist(seriesForm, episodes)
  }

  function nextEpisodeNumber() {
    const season1 = episodes.filter((ep) => ep.season === 1)
    if (season1.length === 0) return 1
    return Math.max(...season1.map((ep) => ep.episode)) + 1
  }

  function handleEpisodeSubmit(e) {
    e.preventDefault()

    let next
    if (editingId) {
      // Editar: conserva la temporada/número que ya tenía este episodio.
      const existing = episodes.find((ep) => ep.id === editingId)
      next = { ...existing, ...epForm, id: editingId }
    } else {
      // Nuevo episodio: se asigna automáticamente al final de la lista.
      const episode = nextEpisodeNumber()
      const id = `s01e${String(episode).padStart(2, "0")}`
      next = { ...epForm, id, season: 1, episode }
    }

    let updated
    if (editingId) {
      updated = episodes.map((ep) => (ep.id === editingId ? next : ep))
    } else {
      updated = [...episodes, next]
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
    if (!confirm("¿Eliminar este episodio? Se publicará de inmediato para todos los visitantes.")) return
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
        <div className="admin-page__header">
          <div>
            <p className="eyebrow">Panel de administración</p>
            <h1 className="admin-page__title">Editar contenido</h1>
          </div>
          <button className="btn btn-ghost" onClick={logout}>
            Cerrar sesión
          </button>
        </div>

        <div className="admin-page__notice">
          <strong>Publicación en tiempo real:</strong> los episodios se guardan en Firebase, así que en
          cuanto los añadas o edites aquí, <strong>todos los visitantes los verán</strong> al recargar el
          sitio, sin importar el navegador o dispositivo. No hace falta hacer commit ni push para esto.
        </div>

        {status === "saving" && <p className="admin-page__status">Guardando…</p>}
        {status === "saved" && <p className="admin-page__status admin-page__status--ok">Publicado ✓</p>}
        {status === "error" && (
          <p className="admin-page__status admin-page__status--error">
            No se pudo guardar. Revisa las reglas de Firebase Realtime Database o tu conexión.
          </p>
        )}

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
          <h2 className="admin-page__subtitle">Respaldo (opcional)</h2>
          <div className="admin-page__export-actions">
            <button className="btn btn-ghost" onClick={handleCopyCode}>
              {copied ? "¡Código copiado!" : "Copiar código de seriesData.js"}
            </button>
            <button
              className="btn btn-ghost"
              onClick={() => download("seriesData.json", JSON.stringify({ series: seriesForm, episodes }, null, 2))}
            >
              Descargar JSON
            </button>
          </div>
          <p className="admin-page__hint">
            No es necesario para publicar: los episodios ya se guardan en Firebase y se ven en cualquier
            navegador en cuanto los guardas. Esto es solo una copia de seguridad por si algún día quieres
            reemplazar el contenido semilla de <code>src/data/seriesData.js</code> en el código.
          </p>
        </div>
      </div>
    </main>
  )
}
