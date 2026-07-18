import { Link } from 'react-router-dom';
import Header from '../components/Header';
import Footer from '../components/Footer';

export default function NotFoundPage() {
  return (
    <div className="app-shell">
      <Header status="empty" />

      <main className="page">
        <div className="state-screen">
          <p className="state-screen__eyebrow">404</p>
          <h2 className="state-screen__title">Página no encontrada</h2>
          <p className="state-screen__text">
            Esta dirección no corresponde a ningún contenido de la serie.
          </p>
          <Link to="/" className="btn btn--outline">
            Volver al inicio
          </Link>
        </div>
      </main>

      <Footer />
    </div>
  );
}
