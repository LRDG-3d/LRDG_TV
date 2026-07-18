// ============================================================================
// ⚠️ CONTENIDO DE PRUEBA — NO ES CONTENIDO REAL ⚠️
// ============================================================================
// Este archivo existe únicamente para poder ver el diseño con datos de
// ejemplo. Está DESACTIVADO por defecto (ver src/config/content.js,
// USE_TEST_PLACEHOLDER_DATA = false).
//
// Todos los títulos incluyen el prefijo "[PRUEBA]" a propósito, y no se
// usan imágenes ni videos reales (thumbnail/videoUrl son null a propósito,
// para que la interfaz muestre sus estados vacíos correspondientes).
//
// Para eliminar por completo el contenido de prueba de el proyecto:
//   1. Borra este archivo.
//   2. Quita su import en src/config/content.js.
// La app seguirá funcionando igual, mostrando el catálogo vacío real.
// ============================================================================

export const testSeriesData = {
  isTestData: true,
  id: 'placeholder',
  title: '[PRUEBA] Nombre de la serie',
  tagline: '[PRUEBA] Texto de ejemplo para la línea descriptiva corta',
  description:
    '[PRUEBA] Este texto es un marcador de posición para comprobar cómo se ' +
    've la sinopsis de la serie en el diseño. Sustitúyelo por la ' +
    'descripción real cuando cargues tu contenido.',
  status: 'ongoing',
  banner: null,
  logo: null,
  seasons: [
    {
      id: 'prueba-temporada-1',
      number: 1,
      title: '[PRUEBA] Temporada 1',
      description: '[PRUEBA] Descripción de ejemplo de la temporada 1.',
      cover: null,
      episodes: [
        {
          id: 'prueba-t1e1',
          number: 1,
          title: '[PRUEBA] Episodio 1',
          description: '[PRUEBA] Sinopsis de ejemplo del episodio 1.',
          thumbnail: null,
          duration: '00:00',
          videoUrl: null,
        },
        {
          id: 'prueba-t1e2',
          number: 2,
          title: '[PRUEBA] Episodio 2',
          description: '[PRUEBA] Sinopsis de ejemplo del episodio 2.',
          thumbnail: null,
          duration: '00:00',
          videoUrl: null,
        },
      ],
    },
  ],
};
