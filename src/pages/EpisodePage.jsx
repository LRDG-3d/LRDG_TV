import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { fetchEpisode } from '../config/content';
import Header from '../components/Header';
import Footer from '../components/Footer';
import LoadingState from '../components/LoadingState';
import EmptyState from '../components/EmptyState';
import ErrorState from '../components/ErrorState';

export default function EpisodePage() {
  const { seasonId, episodeId } = useParams();
  const [phase, setPhase] = useState('loading');
  const [data, setData] = useState(null);
  const [reloadKey, setReloadKey] = useState(0);

  useEffect(() => {
    let cancelled = false;
    setPhase('loading');

    fetchEpisode(seasonId, episodeId)
      .then((result) => {
        if (cancelled) return;
        if (!result) {
          setPhase('empty');
          return;
        }
        setData(result);
        setPhase('ready');
      })
      .catch(() => {
        if (!cancelled) setPhase('error');
      });

    return () => {
      cancelled = true;
    };
  }, [seasonId, episodeId, reloadKey]);

  return (
    <div className="app-shell">
      <Header status={phase === 'ready' ? 'ready' : phase} />

      <main className="page">
        <Link to={`/temporada/${seasonId}`} className="back-link">
          ← Volver a la temporada
        </Link>

        {phase === 'loading' && <LoadingState />}

        {phase === 'error' && (
          <ErrorState onRetry={() => setReloadKey((k) => k + 1)} />
        )}

        {phase === 'empty' && (
          <EmptyState
            title="Episodio no encontrado"
            message="No existe ningún episodio cargado con este identificador."
          />
        )}

        {phase === 'ready' && data && (
          <>
            <div className="player">
              {data.episode.videoUrl ? (
                <video
                  className="player__video"
                  src={data.episode.videoUrl}
                  poster={data.episode.thumbnail || undefined}
                  controls
                />
              ) : (
                <div className="player__placeholder">
                  <span className="player__placeholder-icon" aria-hidden="true">
                    ▶
                  </span>
                  <p>Todavía no se ha cargado el video de este episodio.</p>
                </div>
              )}
            </div>

            <section className="section episode-info">
              <p className="mono-tag">
                T{String(data.season.number).padStart(2, '0')} · E
                {String(data.episode.number).padStart(2, '0')}
                {data.episode.duration ? ` · ${data.episode.duration}` : ''}
              </p>
              <h1 className="episode-info__title">{data.episode.title}</h1>
              {data.episode.description && (
                <p className="description">{data.episode.description}</p>
              )}
            </section>
          </>
        )}
      </main>

      <Footer />
    </div>
  );
}
