import { Link } from 'react-router-dom';
import SignalIndicator from './SignalIndicator';

export default function Header({ status = 'empty' }) {
  return (
    <header className="site-header">
      <Link to="/" className="brand">
        <span className="brand__mark" aria-hidden="true" />
        <span className="brand__name">LRDC&#8209;TV</span>
      </Link>
      <SignalIndicator status={status} />
    </header>
  );
}
