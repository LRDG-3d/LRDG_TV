import { Link } from "react-router-dom"
import "./Navbar.css"

export default function Navbar() {
  return (
    <header className="nav">
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__brand-mark" aria-hidden="true" />
          LRDG_TV
        </Link>
        <Link to="/buscar" className="nav__search" aria-label="Buscar episodios">
          ⌕
        </Link>
      </div>
    </header>
  )
}
