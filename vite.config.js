import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// La app se publica en GitHub Pages bajo /LRDC-TV/, no en la raíz del
// dominio. `base` le dice a Vite que reescriba todas las rutas de los
// assets (JS, CSS, imágenes, fuentes) para que apunten a esa subruta
// tanto en `npm run build` como en `npm run preview`.
export default defineConfig({
  plugins: [react()],
  base: '/LRDC-TV/',
  build: {
    outDir: 'dist',
    sourcemap: false,
  },
})
