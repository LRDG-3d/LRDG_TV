// ============================================================================
// CAPA DE ACCESO A CONTENIDO
// ============================================================================
// Toda la interfaz pide datos a través de las funciones de este archivo
// (fetchSeries / fetchSeason / fetchEpisode). Hoy leen de los archivos
// locales en src/data/. Cuando se añada Firebase (Firestore) en la
// segunda fase, solo hay que reescribir el cuerpo de estas tres
// funciones para que consulten Firestore en vez de los datos locales:
// el resto de la app (páginas, componentes, rutas) no necesita cambiar,
// porque siguen recibiendo la misma forma de datos de siempre.
// ============================================================================

import { seriesData } from '../data/seriesData';
import { testSeriesData } from '../data/testPlaceholderData';

// Cambia esto a `true` SOLO para revisar visualmente el diseño con
// contenido de ejemplo. Debe quedar en `false` antes de publicar la
// serie real. (Puedes también borrar testPlaceholderData.js entero,
// ver instrucciones en ese archivo.)
export const USE_TEST_PLACEHOLDER_DATA = false;

const activeData = USE_TEST_PLACEHOLDER_DATA ? testSeriesData : seriesData;

function delay(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/**
 * Devuelve los datos completos de la serie, o null si todavía no se ha
 * cargado ningún contenido.
 */
export async function fetchSeries() {
  await delay(250);
  return activeData ?? null;
}

/**
 * Devuelve una temporada por id, o null si no existe.
 */
export async function fetchSeason(seasonId) {
  await delay(200);
  if (!activeData) return null;
  return activeData.seasons?.find((season) => season.id === seasonId) ?? null;
}

/**
 * Devuelve { episode, season } para un episodio concreto, o null si no
 * existe.
 */
export async function fetchEpisode(seasonId, episodeId) {
  await delay(200);
  if (!activeData) return null;
  const season = activeData.seasons?.find((s) => s.id === seasonId);
  if (!season) return null;
  const episode = season.episodes?.find((e) => e.id === episodeId);
  if (!episode) return null;
  return { episode, season };
}
