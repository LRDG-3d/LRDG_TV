# LRDC-TV

Plataforma de streaming dedicada **exclusivamente a una única serie**. No es
un catálogo genérico: toda la estructura (temporadas, episodios,
reproductor) pertenece a una sola serie. Se entrega **sin contenido
precargado**: el catálogo empieza vacío y muestra un estado profesional de
"sin contenido" hasta que se añada la serie real.

## Stack

- React 18 + Vite 5
- React Router 6 (`HashRouter`)
- Sin backend, sin base de datos, sin login (fase 1, solo frontend)
- Despliegue automático a GitHub Pages con GitHub Actions

## Primer uso (importante)

Este proyecto **no incluye `package-lock.json`** todavía, porque se generó
en un entorno sin acceso a internet. Antes de subirlo a GitHub, hazlo una
vez en tu máquina:

```bash
npm install
```

Esto creará `package-lock.json`. Súbelo al repositorio junto con el resto
del código: el workflow de despliegue usa `npm ci`, que necesita ese
archivo para instalar exactamente las mismas versiones.

## Scripts

```bash
npm run dev       # servidor de desarrollo
npm run build     # build de producción en ./dist
npm run preview   # sirve el build de ./dist localmente para comprobarlo
```

Comprueba siempre `npm run build && npm run preview` antes de dar por
buena una versión: es la mejor forma de detectar problemas de rutas que
`npm run dev` no muestra.

## Estructura del contenido

Todo el contenido pasa por `src/config/content.js`, que expone tres
funciones (`fetchSeries`, `fetchSeason`, `fetchEpisode`) usadas por las
páginas. Hoy leen de `src/data/seriesData.js`, que está vacío a
propósito:

```js
export const seriesData = null;
```

Para publicar tu serie, sustituye ese `null` por el objeto descrito en los
comentarios del propio archivo (título, sinopsis, banner, temporadas y
episodios).

### Contenido de prueba (opcional)

`src/data/testPlaceholderData.js` contiene datos ficticios claramente
marcados con el prefijo `[PRUEBA]`, pensados solo para revisar el diseño.
Están **desactivados por defecto**. Para activarlos temporalmente, cambia
en `src/config/content.js`:

```js
export const USE_TEST_PLACEHOLDER_DATA = true;
```

Para eliminarlos por completo, borra `testPlaceholderData.js` y quita su
`import` en `content.js`.

## Rutas

| Ruta                                              | Página                        |
| -------------------------------------------------- | ----------------------------- |
| `/`                                                | Página principal de la serie  |
| `/temporada/:seasonId`                            | Episodios de una temporada    |
| `/temporada/:seasonId/episodio/:episodeId`        | Reproductor de un episodio    |
| cualquier otra                                    | Página 404                    |

Se usa `HashRouter` (URLs con `#`) a propósito: GitHub Pages no ejecuta
código de servidor, así que recargar directamente una ruta interna con un
`BrowserRouter` normal daría un 404 real de GitHub. Con `HashRouter`,
GitHub Pages solo necesita servir siempre `index.html`, y el enrutado
ocurre en el navegador — nunca hay pantalla en blanco ni 404 al recargar.

## Estados de la interfaz

Cada página maneja explícitamente cuatro estados: cargando, catálogo/ítem
vacío, error, y "no encontrado" (404 para rutas inexistentes). Además,
`ErrorBoundary` envuelve toda la aplicación para que un error de
JavaScript nunca deje la pantalla en blanco.

## Despliegue en GitHub Pages

1. Crea el repositorio `LRDC-TV` en GitHub y sube este proyecto (rama
   `main`), incluyendo `package-lock.json` (ver arriba).
2. En **Settings → Pages**, en "Build and deployment" selecciona **Source:
   GitHub Actions**.
3. Al hacer push a `main`, el workflow `.github/workflows/deploy.yml`
   instala dependencias, ejecuta `npm run build` y publica `./dist`.
4. La app quedará disponible en `https://<usuario>.github.io/LRDC-TV/`.

`vite.config.js` ya tiene `base: '/LRDC-TV/'`, necesario para que todos los
assets (JS, CSS, fuentes, imágenes) se resuelvan correctamente bajo esa
subruta en vez de asumir la raíz del dominio.

## Próxima fase: panel de administración

La capa `src/config/content.js` está pensada para que, cuando se añada
Firebase (Firestore para los datos, Storage para imágenes/video, y un
panel de administración con login), solo haga falta reescribir el cuerpo
de `fetchSeries` / `fetchSeason` / `fetchEpisode` para leer de Firestore en
vez de los archivos locales. Ninguna página ni componente necesita
cambiar, porque todos reciben los datos con la misma forma de siempre.
