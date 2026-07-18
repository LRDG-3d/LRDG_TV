import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchSeason } from '../config/content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';
import EpisodeRow from '../components/EpisodeRow';

export default function SeasonPage() {
  const { seasonId } = useParams();
  const [phase, setPhase] = useState('loading');
  const [season, setSeason] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setPhase('loading');

    fetchSeason(seasonId)
      .then((data) => {
        if (cancelled) return;
        if (!data) {
          setPhase('empty');
          return;
        }
        setSeason(data);
        setPhase('ready');
      })
      .catch(() => {
        if (!cancelled) setPhase('error');
      });

    return () => {
      cancelled = true;
    };
  }, [seasonId, reloadKey]);

  return (
    <div className="app-shell">
      <Header status={phase === 'ready' ? 'ready' : phase} />

      <main className="page">
        <Link to="/" className="back-link">
          ← Volver a la serie
        </Link>

        {phase === 'loading' && <LoadingState />}

        {phase === 'error' && (
          <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />
        )}

        {phase === 'empty' && (
          <EmptyState
            title="Temporada no encontrada"
            message="No existe ninguna temporada cargada con este identificador."
          />
        )}

        {phase === 'ready' && season && (
          <>
            <section className="hero hero--season">
              <div className="hero__banner">
                {season.cover ? (
                  <img src={season.cover} alt="" />
                ) : (
                  <div className="media-placeholder media-placeholder--hero" aria-hidden="true" />
                )}
                <div className="hero__scrim" aria-hidden="true" />
              </div>
              <div className="hero__content">
                <p className="hero__eyebrow mono-tag">
                  T{String(season.number).padStart(2, '0')}
                </p>
                <h1 className="hero__title">{season.title}</h1>
              </div>
            </section>

            {season.description && (
              <section className="section">
                <p className="description">{season.description}</p>
              </section>
            )}

            <section className="section">
              <h2 className="section__label mono-tag">Episodios</h2>

              {season.episodes && season.episodes.length > 0 ? (
                <div className="episode-list">
                  {season.episodes.map((episode) => (
                    <EpisodeRow
                      key={episode.id}
                      seasonId={season.id}
                      episode={episode}
                    />
                  ))}
                </div>
              ) : (
                <EmptyState
                  title="Sin episodios todavía"
                  message="Esta temporada aún no tiene episodios cargados."
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
