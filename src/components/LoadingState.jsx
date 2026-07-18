export default function LoadingState({ label = 'Sintonizando la señal…' }) {
  return (
    <div className="state-screen" role="status" aria-live="polite">
      <div className="state-screen__bars" aria-hidden="true">
        <span />
        <span />
        <span />
        <span />
        <span />
      </div>
      <p className="state-screen__text">{label}</p>
    </div>
  );
}
