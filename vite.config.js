import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// IMPORTANT: base must match your GitHub repository name exactly.
// Repo: https://github.com/<tu-usuario>/LRDG_TV
// Pages URL será: https://<tu-usuario>.github.io/LRDG_TV/
export default defineConfig({
  plugins: [react()],
  base: '/LRDG_TV/',
})
