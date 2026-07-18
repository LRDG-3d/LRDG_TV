import { NavLink } from "react-router-dom"
import "./BottomNav.css"

const tabs = [
  { to: "/", label: "Inicio", icon: "⌂", end: true },
  { to: "/episodios", label: "Episodios", icon: "▤" },
  { to: "/buscar", label: "Buscar", icon: "⌕" },
]

export default function BottomNav() {
  return (
    <nav className="bottom-nav" aria-label="Navegación principal">
      {tabs.map((tab) => (
        <NavLink
          key={tab.to}
          to={tab.to}
          end={tab.end}
          className={({ isActive }) => `bottom-nav__tab ${isActive ? "is-active" : ""}`}
        >
          <span className="bottom-nav__icon" aria-hidden="true">
            {tab.icon}
          </span>
          {tab.label}
        </NavLink>
      ))}
    </nav>
  )
}
