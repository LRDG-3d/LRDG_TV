export default function EmptyState({
  title = 'Sin señal',
  message = 'Todavía no se ha cargado contenido para esta serie.',
  hint,
}) {
  return (
    <div className="state-screen state-screen--empty">
      <div className="state-screen__noise" aria-hidden="true" />
      <p className="state-screen__eyebrow">000 · 00 · 00</p>
      <h2 className="state-screen__title">{title}</h2>
      <p className="state-screen__text">{message}</p>
      {hint ? <p className="state-screen__hint">{hint}</p> : null}
    </div>
  );
}
