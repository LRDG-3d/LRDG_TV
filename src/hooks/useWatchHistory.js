import { useState, useCallback } from "react"

const KEY = "lrdg-tv:watch-history"

function read() {
  try {
    const raw = localStorage.getItem(KEY)
    return raw ? JSON.parse(raw) : {}
  } catch {
    return {}
  }
}

// Guarda el progreso de reproducción en ESTE navegador (no se comparte entre
// visitantes, igual que el "seguir viendo" de cualquier app de streaming).
export function useWatchHistory() {
  const [history, setHistory] = useState(read)

  const saveProgress = useCallback((episodeId, currentTime, duration) => {
    if (!episodeId || !duration) return
    setHistory((prev) => {
      const ratio = currentTime / duration
      const next = {
        ...prev,
        [episodeId]: {
          progress: currentTime,
          duration,
          watched: ratio > 0.92 || Boolean(prev[episodeId]?.watched),
          lastWatchedAt: Date.now(),
        },
      }
      localStorage.setItem(KEY, JSON.stringify(next))
      return next
    })
  }, [])

  return { history, saveProgress }
}
