import { HashRouter, Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import SeasonPage from './pages/SeasonPage';
import EpisodePage from './pages/EpisodePage';
import NotFoundPage from './pages/NotFoundPage';

// Se usa HashRouter (rutas del tipo /LRDC-TV/#/temporada/1) a propósito.
// GitHub Pages no soporta el enrutado del lado del servidor que
// necesitaría un BrowserRouter normal (recargar /temporada/1 directamente
// daría un 404 de GitHub). Con HashRouter, GitHub Pages solo necesita
// servir siempre index.html, y el enrutado real ocurre en el navegador,
// así que recargar cualquier URL interna nunca produce una pantalla en
// blanco ni un 404.
export default function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/temporada/:seasonId" element={<SeasonPage />} />
        <Route
          path="/temporada/:seasonId/episodio/:episodeId"
          element={<EpisodePage />}
        />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </HashRouter>
  );
}
