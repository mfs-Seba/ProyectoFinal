import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

export default function CategoriaForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editar = Boolean(id)

  const [form, setForm] = useState({ nombre: '', descripcion: '' })
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (editar) {
      api.get(`/api/categorias/${id}`).then(r => {
        setForm({ nombre: r.data.nombre || '', descripcion: r.data.descripcion || '' })
      })
    }
  }, [id, editar])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (editar) {
        await api.put(`/api/categorias/${id}`, form)
      } else {
        await api.post('/api/categorias', form)
      }
      navigate('/categorias')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error guardando')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-6">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-4">{editar ? 'Editar categoría' : 'Nueva categoría'}</h3>
            {error && <div className="alert alert-danger">{error}</div>}
            <form onSubmit={onSubmit}>
              <div className="mb-3">
                <label className="form-label">Nombre *</label>
                <input name="nombre" className="form-control" value={form.nombre} onChange={onChange} required />
              </div>
              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea name="descripcion" className="form-control" rows={3} value={form.descripcion} onChange={onChange} />
              </div>
              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : (editar ? 'Actualizar' : 'Crear')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/categorias')}>
                  Cancelar
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
