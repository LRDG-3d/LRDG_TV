import { useEffect, useState, useCallback } from "react"
import { series as baseSeries, episodes as baseEpisodes } from "../data/seriesData"

const STORAGE_KEY = "lrdc-tv:overrides"

// Lee overrides guardados localmente en el navegador (solo en tu dispositivo).
// GitHub Pages no tiene backend, así que esto NO se sincroniza entre visitantes:
// es una libreta de borrador para que pruebes cambios antes de copiarlos
// al archivo src/data/seriesData.js de verdad.
function readOverrides() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function useSeriesData() {
  const [overrides, setOverrides] = useState(readOverrides)

  const series = overrides?.series ?? baseSeries
  const episodes = overrides?.episodes ?? baseEpisodes

  const saveOverrides = useCallback((next) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next))
    setOverrides(next)
  }, [])

  const resetOverrides = useCallback(() => {
    localStorage.removeItem(STORAGE_KEY)
    setOverrides(null)
  }, [])

  const hasLocalChanges = Boolean(overrides)

  return { series, episodes, saveOverrides, resetOverrides, hasLocalChanges }
}
