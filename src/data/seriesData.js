// ============================================================================
// DATOS DE LA SERIE
// ----------------------------------------------------------------------------
// Este es el ÚNICO archivo que necesitas editar para poner tu propia serie.
// No contiene contenido real: son datos de ejemplo para que veas la estructura.
//
// - "series"   -> información general (título, descripción, imágenes, etc.)
// - "episodes" -> lista de episodios, agrupados por temporada
//
// Puedes editar este archivo a mano, o usar el Panel de Administración
// (ruta #/admin) para generar el código actualizado y pegarlo aquí.
// ============================================================================

export const series = {
  title: "Nombre de la Serie",
  tagline: "El eslogan o frase corta de la serie va aquí",
  synopsis:
    "Escribe aquí la sinopsis de tu serie. Este texto aparece en el hero de la página de inicio y describe de qué trata la historia, quiénes son los personajes principales y qué la hace especial.",
  heroImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=1920&auto=format&fit=crop",
  posterImage: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?q=80&w=600&auto=format&fit=crop",
  year: "2024",
  genres: ["Drama", "Misterio"],
  rating: "16+",
  seasonsCount: 1,
}

export const episodes = [
  {
    id: "s01e01",
    season: 1,
    episode: 1,
    title: "Episodio de ejemplo 1",
    description:
      "Descripción corta de este episodio de ejemplo. Reemplázala con la sinopsis real de tu episodio.",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    duration: "42:00",
    date: "2024-01-01",
  },
  {
    id: "s01e02",
    season: 1,
    episode: 2,
    title: "Episodio de ejemplo 2",
    description:
      "Descripción corta de este episodio de ejemplo. Reemplázala con la sinopsis real de tu episodio.",
    thumbnail: "https://images.unsplash.com/photo-1478760329108-5c3ed9d495a0?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    duration: "38:00",
    date: "2024-01-08",
  },
  {
    id: "s01e03",
    season: 1,
    episode: 3,
    title: "Episodio de ejemplo 3",
    description:
      "Descripción corta de este episodio de ejemplo. Reemplázala con la sinopsis real de tu episodio.",
    thumbnail: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://interactive-examples.mdn.mozilla.net/media/cc0-videos/flower.mp4",
    duration: "45:00",
    date: "2024-01-15",
  },
]
