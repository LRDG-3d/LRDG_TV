const STATUS_MAP = {
  loading: { label: 'Sintonizando…', className: 'signal--loading' },
  empty: { label: 'Sin señal', className: 'signal--empty' },
  error: { label: 'Error de transmisión', className: 'signal--error' },
  ready: { label: 'En emisión', className: 'signal--ready' },
  archived: { label: 'Archivo', className: 'signal--archived' },
};

export default function SignalIndicator({ status = 'empty' }) {
  const config = STATUS_MAP[status] ?? STATUS_MAP.empty;

  return (
    <span className={`signal ${config.className}`}>
      <span className="signal__dot" aria-hidden="true" />
      <span className="signal__label">{config.label}</span>
    </span>
  );
}
