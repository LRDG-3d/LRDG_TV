export default function ErrorState({
  title = 'Error de transmisión',
  message = 'No se ha podido cargar el contenido. Inténtalo de nuevo.',
  onRetry,
}) {
  return (
    <div className="state-screen state-screen--error">
      <p className="state-screen__eyebrow">ERR</p>
      <h2 className="state-screen__title">{title}</h2>
      <p className="state-screen__text">{message}</p>
      {onRetry ? (
        <button type="button" className="btn btn--outline" onClick={onRetry}>
          Reintentar
        </button>
      ) : null}
    </div>
  );
}
