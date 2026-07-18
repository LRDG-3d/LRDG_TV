import { useEffect, useState } from 'react';
import { fetchSeries } from '../config/content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import TestDataBanner from '../components/TestDataBanner';
import SeasonCard from '../components/SeasonCard';

const STATUS_LABEL = {
  ongoing: 'En emisión',
  ended: 'Finalizada',
};

export default function HomePage() {
  const [phase, setPhase] = useState('loading'); // loading | empty | error | ready
  const [series, setSeries] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setPhase('loading');

    fetchSeries()
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setPhase('empty');
          return;
        }
        setSeries(data);
        setPhase('ready');
      })
      .catch(() => {
        if (!cancelled) setPhase('error');
      });

    return () => {
      cancelled = true;
    };
  }, [reloadKey]);

  const signalStatus =
    phase === 'ready'
      ? series?.status === 'ended'
        ? 'archived'
        : 'ready'
      : phase;

  return (
    <div className="app-shell">
      <Header status={signalStatus} />

      <main className="page">
        {phase === 'loading' && <LoadingState />}

        {phase === 'error' && (
          <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />
        )}

        {phase === 'empty' && (
          <EmptyState
            title="Todavía no hay contenido"
            message="Esta plataforma está lista para tu serie, pero aún no se ha cargado ninguna temporada ni episodio."
            hint="El contenido se añadirá próximamente desde el panel de administración."
          />
        )}

        {phase === 'ready' && series && (
          <>
            {series.isTestData && <TestDataBanner />}

            <section className="hero">
              <div className="hero__banner">
                {series.banner ? (
                  <img src={series.banner} alt="" />
                ) : (
                  <div className="media-placeholder media-placeholder--hero" aria-hidden="true" />
                )}
                <div className="hero__scrim" aria-hidden="true" />
              </div>

              <div className="hero__content">
                {series.tagline && (
                  <p className="hero__eyebrow">{series.tagline}</p>
                )}
                <h1 className="hero__title">{series.title}</h1>
                <p className="hero__status mono-tag">
                  {STATUS_LABEL[series.status] || 'Estado desconocido'} ·{' '}
                  {series.seasons?.length ?? 0}{' '}
                  {series.seasons?.length === 1 ? 'temporada' : 'temporadas'}
                </p>
              </div>
            </section>

            {series.description && (
              <section className="section">
                <h2 className="section__label mono-tag">Sinopsis</h2>
                <p className="description">{series.description}</p>
              </section>
            )}

            <section className="section">
              <h2 className="section__label mono-tag">Temporadas</h2>

              {series.seasons && series.seasons.length > 0 ? (
                <div className="season-grid">
                  {series.seasons.map((season) => (
                    <SeasonCard key={season.id} season={season} />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Sin temporadas todavía"
                  message="Esta serie aún no tiene temporadas cargadas."
                />
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
