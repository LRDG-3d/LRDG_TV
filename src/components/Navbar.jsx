import { useEffect, useState } from "react"
import { Link, NavLink } from "react-router-dom"
import { series } from "../data/seriesData"
import "./Navbar.css"

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    window.addEventListener("scroll", onScroll)
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  return (
    <header className={`nav ${scrolled ? "nav--scrolled" : ""}`}>
      <div className="container nav__inner">
        <Link to="/" className="nav__brand">
          <span className="nav__brand-mark" aria-hidden="true" />
          {series.title || "LRDG_TV"}
        </Link>
        <nav className="nav__links">
          <NavLink to="/" end className={({ isActive }) => (isActive ? "is-active" : "")}>
            Inicio
          </NavLink>
          <NavLink to="/episodios" className={({ isActive }) => (isActive ? "is-active" : "")}>
            Episodios
          </NavLink>
          <NavLink to="/admin" className="nav__admin">
            Admin
          </NavLink>
        </nav>
      </div>
    </header>
  )
}
