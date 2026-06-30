import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'

export default function Register() {
  const navigate = useNavigate()
  const [form, setForm] = useState({
    username: '',
    password: '',
    email: '',
    rol: 'USER',
  })
  const [error, setError] = useState(null)
  const [ok, setOk] = useState(null)
  const [loading, setLoading] = useState(false)

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setOk(null)
    setLoading(true)
    try {
      await api.post('/auth/register', form)
      setOk('Usuario creado. Ya puedes iniciar sesión.')
      setTimeout(() => navigate('/login'), 1500)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'No se pudo crear el usuario')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center mt-5">
      <div className="col-md-5">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h4 className="card-title text-center mb-4">Crear cuenta</h4>

            {error && <div className="alert alert-danger">{error}</div>}
            {ok && <div className="alert alert-success">{ok}</div>}

            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input type="text" name="username" className="form-control" value={form.username} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Email</label>
                <input type="email" name="email" className="form-control" value={form.email} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Contraseña</label>
                <input type="password" name="password" className="form-control" value={form.password} onChange={onChange} required minLength={6} />
              </div>
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select name="rol" className="form-select" value={form.rol} onChange={onChange}>
                  <option value="USER">Cliente (USER)</option>
                  <option value="ADMIN">Administrador (ADMIN)</option>
                </select>
              </div>
              <button type="submit" className="btn btn-primary w-100" disabled={loading}>
                {loading ? 'Creando...' : 'Registrarse'}
              </button>
            </form>

            <hr />
            <p className="text-center mb-0">
              ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
