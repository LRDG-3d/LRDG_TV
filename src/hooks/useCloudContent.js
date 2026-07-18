import { useEffect, useState, useCallback } from "react"
import { ref, onValue, set } from "firebase/database"
import { db } from "../firebase.js"
import { series as seedSeries, episodes as seedEpisodes } from "../data/seriesData.js"

const contentRef = ref(db, "content")

// Todos los visitantes leen del mismo lugar (Firebase Realtime Database),
// así que lo que publiques desde /#/admin lo ve cualquiera, en cualquier
// navegador, sin necesidad de hacer git push.
export function useCloudContent() {
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const unsubscribe = onValue(
      contentRef,
      (snapshot) => {
        setData(snapshot.val())
        setLoading(false)
      },
      (err) => {
        console.error("Firebase read error:", err)
        setError(err)
        setLoading(false)
      }
    )
    return unsubscribe
  }, [])

  // Si todavía no se ha publicado nada en Firebase, se usa
  // src/data/seriesData.js como contenido inicial de respaldo.
  const series = data?.series ?? seedSeries
  const episodes = data?.episodes ?? seedEpisodes

  const publish = useCallback(async (nextSeries, nextEpisodes) => {
    await set(contentRef, { series: nextSeries, episodes: nextEpisodes })
  }, [])

  return { series, episodes, loading, error, publish }
}
