import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Login() {
  const { login, isAuthenticated } = useAuth()
  const navigate = useNavigate()
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  if (isAuthenticated()) {
    navigate('/productos', { replace: true })
  }

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await login(username, password)
      navigate('/productos')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Credenciales inválidas')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="card-title text-center mb-4">
              <i className="bi bi-bag-heart-fill text-primary me-2"></i>
              Tienda Ropa
            </h3>
            <h5 className="text-center mb-4">Iniciar sesión</h5>

            {error && (
              <div className="alert alert-danger" role="alert">
                <i className="bi bi-exclamation-triangle-fill me-2"></i>{error}
              </div>
            )}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  required
                  autoFocus
                />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input
                  type="password"
                  className="form-control"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Ingresando...' : 'Ingresar'}
              </button>
            </form>

            <hr />
            <p className="text-center mb-0">
              ¿No tienes cuenta? <Link to="/register">Regístrate</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
