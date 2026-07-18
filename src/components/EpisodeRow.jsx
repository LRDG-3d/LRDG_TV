import { Link } from 'react-router-dom';

export default function EpisodeRow({ seasonId, episode }) {
  const code = `T${String(episode.number).padStart(2, '0')} · E${String(
    episode.number
  ).padStart(2, '0')}`;

  return (
    <Link
      to={`/temporada/${seasonId}/episodio/${episode.id}`}
      className="episode-row"
    >
      <span className="episode-row__code mono-tag">{code}</span>

      <span className="episode-row__thumb">
        {episode.thumbnail ? (
          <img src={episode.thumbnail} alt="" loading="lazy" />
        ) : (
          <span className="media-placeholder media-placeholder--sm" aria-hidden="true">
            ▶
          </span>
        )}
      </span>

      <span className="episode-row__body">
        <span className="episode-row__title">{episode.title}</span>
        {episode.description ? (
          <span className="episode-row__desc">{episode.description}</span>
        ) : null}
      </span>

      <span className="episode-row__duration mono-tag">
        {episode.duration || '--:--'}
      </span>
    </Link>
  );
}
