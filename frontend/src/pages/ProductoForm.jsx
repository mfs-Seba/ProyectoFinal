import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import api from '../api/axios'

const VACIO = {
  nombre: '',
  descripcion: '',
  precio: '',
  stock: 0,
  talla: '',
  color: '',
  imagenUrl: '',
  categoriaId: '',
}

export default function ProductoForm() {
  const { id } = useParams()
  const navigate = useNavigate()
  const editar = Boolean(id)

  const [form, setForm] = useState(VACIO)
  const [categorias, setCategorias] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    api.get('/api/categorias').then(r => setCategorias(r.data))
    if (editar) {
      api.get(`/api/productos/${id}`).then(r => {
        const p = r.data
        setForm({
          nombre: p.nombre || '',
          descripcion: p.descripcion || '',
          precio: p.precio || '',
          stock: p.stock ?? 0,
          talla: p.talla || '',
          color: p.color || '',
          imagenUrl: p.imagenUrl || '',
          categoriaId: p.categoriaId || '',
        })
      })
    }
  }, [id, editar])

  const onChange = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const onSubmit = async (e) => {
    e.preventDefault()
    setError(null)
    setLoading(true)
    const payload = {
      ...form,
      precio: parseFloat(form.precio),
      stock: parseInt(form.stock, 10),
      categoriaId: parseInt(form.categoriaId, 10),
    }
    try {
      if (editar) {
        await api.put(`/api/productos/${id}`, payload)
      } else {
        await api.post('/api/productos', payload)
      }
      navigate('/productos')
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error guardando producto')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="row justify-content-center">
      <div className="col-md-8">
        <div className="card shadow-sm">
          <div className="card-body p-4">
            <h3 className="mb-4">
              <i className="bi bi-tag-fill me-2 text-primary"></i>
              {editar ? 'Editar producto' : 'Nuevo producto'}
            </h3>

            {error && <div className="alert alert-danger">{error}</div>}

            <form onSubmit={onSubmit}>
              <div className="row">
                <div className="col-md-8 mb-3">
                  <label className="form-label">Nombre *</label>
                  <input name="nombre" className="form-control" value={form.nombre} onChange={onChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Categoría *</label>
                  <select name="categoriaId" className="form-select" value={form.categoriaId} onChange={onChange} required>
                    <option value="">Seleccione...</option>
                    {categorias.map(c => <option key={c.id} value={c.id}>{c.nombre}</option>)}
                  </select>
                </div>
              </div>

              <div className="mb-3">
                <label className="form-label">Descripción</label>
                <textarea name="descripcion" className="form-control" rows={2} value={form.descripcion} onChange={onChange} />
              </div>

              <div className="row">
                <div className="col-md-4 mb-3">
                  <label className="form-label">Precio *</label>
                  <input type="number" step="0.01" name="precio" className="form-control" value={form.precio} onChange={onChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Stock *</label>
                  <input type="number" name="stock" className="form-control" value={form.stock} onChange={onChange} required />
                </div>
                <div className="col-md-4 mb-3">
                  <label className="form-label">Talla</label>
                  <input name="talla" className="form-control" value={form.talla} onChange={onChange} placeholder="S, M, L, XL" />
                </div>
              </div>

              <div className="row">
                <div className="col-md-6 mb-3">
                  <label className="form-label">Color</label>
                  <input name="color" className="form-control" value={form.color} onChange={onChange} />
                </div>
                <div className="col-md-6 mb-3">
                  <label className="form-label">URL Imagen</label>
                  <input name="imagenUrl" className="form-control" value={form.imagenUrl} onChange={onChange} />
                </div>
              </div>

              <div className="d-flex gap-2">
                <button type="submit" className="btn btn-primary" disabled={loading}>
                  {loading ? 'Guardando...' : (editar ? 'Actualizar' : 'Crear')}
                </button>
                <button type="button" className="btn btn-secondary" onClick={() => navigate('/productos')}>
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
