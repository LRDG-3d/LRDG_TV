# LRDG_TV

Plataforma de streaming estática dedicada a una sola serie. React + Vite, sin backend, sin base de datos, lista para GitHub Pages.

## Estructura del proyecto

```
LRDG_TV/
├── .github/workflows/deploy.yml   # Deploy automático a GitHub Pages
├── index.html
├── package.json
├── vite.config.js                 # base: '/LRDG_TV/'
├── public/
└── src/
    ├── main.jsx
    ├── App.jsx                    # Rutas (HashRouter)
    ├── data/
    │   └── seriesData.js          # ⭐ ÚNICO archivo que editas para tu serie
    ├── hooks/
    │   └── useSeriesData.js       # Combina seriesData.js con el borrador local (Admin)
    ├── components/
    │   ├── Navbar.jsx / .css
    │   ├── Hero.jsx / .css
    │   ├── EpisodeCard.jsx / .css
    │   ├── EpisodeReel.jsx / .css
    │   └── VideoPlayer.jsx / .css
    ├── pages/
    │   ├── Home.jsx / .css
    │   ├── Episodes.jsx / .css
    │   ├── Watch.jsx / .css
    │   └── Admin.jsx / .css
    └── styles/
        └── global.css
```

## Desarrollo local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

> `npm install` genera (o actualiza) `package-lock.json` automáticamente. Ese archivo
> **debe subirse al repositorio** (`git add package-lock.json`) para que las instalaciones
> sean reproducibles. El workflow de GitHub Actions usa `npm install`, así que funciona
> tanto si ya subiste el lockfile como si es la primera vez.

## Build de producción

```bash
npm run build
npm run preview   # para probar el build localmente antes de subirlo
```

El resultado se genera en `dist/`.

## Cómo agregar tu serie

Edita **`src/data/seriesData.js`**:

- `series`: título, sinopsis, imagen de fondo del hero, año, géneros, etc.
- `episodes`: un array de objetos, uno por episodio (temporada, número, título,
  descripción, miniatura, `videoUrl` con el enlace directo al video, duración y fecha).

También puedes usar el **panel de administración** en `/#/admin` dentro de la app:
te permite añadir/editar/eliminar episodios con una interfaz visual y una vista previa
de la miniatura. Como GitHub Pages es estático, esos cambios solo se guardan en el
`localStorage` de tu navegador (un borrador local). Para publicarlos de verdad:

1. Haz tus cambios en `/#/admin`.
2. Pulsa **"Copiar código de seriesData.js"** (o "Descargar JSON" si prefieres).
3. Pega ese código dentro de `src/data/seriesData.js`, reemplazando su contenido.
4. Sube los cambios: `git add . && git commit -m "actualizar episodios" && git push`.

## Por qué usa `videoUrl` en vez de subir archivos de video

GitHub Pages solo sirve archivos estáticos y tiene límites de tamaño de repositorio,
así que no está pensado para alojar archivos de video pesados. `videoUrl` debe ser un
enlace directo (`.mp4`, `.webm`, etc.) a un video alojado en otro lugar (por ejemplo
un bucket de almacenamiento, un CDN, o tu propio servidor). El reproductor es un
`<video>` HTML5 estándar, así que cualquier URL directa funciona.

## Por qué HashRouter (rutas con `#`)

La app usa `HashRouter` de `react-router-dom` en vez de `BrowserRouter`. Esto significa
que las rutas se ven así: `tuusuario.github.io/LRDG_TV/#/episodios`. La ventaja es que
**funciona perfectamente en GitHub Pages sin ninguna configuración adicional**: no hay
riesgo de pantalla en blanco ni de error 404 al recargar la página en una ruta interna,
porque el navegador nunca le pide al servidor una ruta que no existe — todo después del
`#` lo maneja React en el cliente.

## Deploy en GitHub Pages (recomendado: GitHub Actions)

1. Crea el repositorio **`LRDG_TV`** en GitHub (puede estar vacío).
2. Sube este proyecto:
   ```bash
   git init
   git add .
   git commit -m "Proyecto inicial LRDG_TV"
   git branch -M main
   git remote add origin https://github.com/TU-USUARIO/LRDG_TV.git
   git push -u origin main
   ```
3. En GitHub, ve a **Settings → Pages**.
4. En **"Build and deployment" → "Source"**, elige **"GitHub Actions"**.
5. El workflow `.github/workflows/deploy.yml` ya incluido se ejecutará automáticamente
   en cada `push` a `main`: instala dependencias, hace `npm run build` y publica la
   carpeta `dist/` en GitHub Pages.
6. Después de unos minutos, tu sitio estará en:
   `https://TU-USUARIO.github.io/LRDG_TV/`

### Alternativa: `gh-pages` (deploy manual desde tu máquina)

Si prefieres no usar Actions:

```bash
npm run build
npm run deploy
```

Esto usa el paquete `gh-pages` (ya incluido en `devDependencies`) para publicar la
carpeta `dist/` en la rama `gh-pages`. Luego, en **Settings → Pages → Source**, elige
**"Deploy from a branch"** y selecciona la rama `gh-pages`.

## Checklist para evitar la pantalla en blanco

Si al desplegar ves una página en blanco, revisa:

- [ ] `vite.config.js` tiene `base: '/LRDG_TV/'` (debe coincidir EXACTAMENTE con el
      nombre del repositorio, con `/` al inicio y al final).
- [ ] Estás usando `HashRouter`, no `BrowserRouter` (ya viene así configurado).
- [ ] En **Settings → Pages**, el "Source" está en "GitHub Actions" (o en la rama
      correcta si usaste `gh-pages`).
- [ ] Revisa la consola del navegador (F12): si ves errores 404 en archivos `.js`/`.css`,
      normalmente es porque el `base` no coincide con el nombre real del repo.
- [ ] El workflow en la pestaña **Actions** del repositorio terminó en verde (✅).

## Notas de diseño

- Paleta cine/marquesina: fondo casi negro (`#0a0a0d`), acento rojo marquesina
  (`#c81e3a`) y dorado de proyector (`#d4a24c`) para datos y detalles.
- Tipografía: `Bebas Neue` para títulos grandes (estilo cartel), `Manrope` para texto,
  `JetBrains Mono` para metadatos (duración, fechas, números de episodio).
- Las tarjetas de episodio llevan una perforación tipo fotograma de película como
  detalle distintivo, arriba y abajo de la miniatura.
- No se incluye contenido real de ninguna serie: `src/data/seriesData.js` trae datos
  de ejemplo (imágenes libres de Unsplash y un video de muestra de MDN) listos para que
  los reemplaces por los tuyos.
