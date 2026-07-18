import { Link } from 'react-router-dom';

export default function SeasonCard({ season }) {
  const episodeCount = season.episodes?.length ?? 0;

  return (
    <Link to={`/temporada/${season.id}`} className="season-card">
      <div className="season-card__cover">
        {season.cover ? (
          <img src={season.cover} alt="" loading="lazy" />
        ) : (
          <div className="media-placeholder" aria-hidden="true">
            <span>T{String(season.number).padStart(2, '0')}</span>
          </div>
        )}
      </div>
      <div className="season-card__meta">
        <span className="mono-tag">
          T{String(season.number).padStart(2, '0')}
        </span>
        <h3 className="season-card__title">{season.title}</h3>
        <p className="season-card__count">
          {episodeCount} {episodeCount === 1 ? 'episodio' : 'episodios'}
        </p>
      </div>
    </Link>
  );
}
