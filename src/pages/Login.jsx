import { useState } from "react"
import "./Login.css"

export default function Login({ onLogin }) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [submitting, setSubmitting] = useState(false)

  async function handleSubmit(e) {
    e.preventDefault()
    setError("")
    setSubmitting(true)
    try {
      await onLogin(email, password)
    } catch (err) {
      setError("Correo o contraseña incorrectos.")
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <main className="login-page">
      <form className="login-card" onSubmit={handleSubmit}>
        <p className="eyebrow">Acceso restringido</p>
        <h1 className="login-card__title">Iniciar sesión</h1>
        <p className="login-card__hint">Solo el administrador de esta plataforma puede entrar aquí.</p>

        <label>
          Correo electrónico
          <input
            type="email"
            required
            autoComplete="username"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </label>
        <label>
          Contraseña
          <input
            type="password"
            required
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </label>

        {error && <p className="login-card__error">{error}</p>}

        <button type="submit" className="btn btn-primary login-card__submit" disabled={submitting}>
          {submitting ? "Entrando…" : "Entrar"}
        </button>
      </form>
    </main>
  )
}
