import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function ProductosList() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [productos, setProductos] = useState([])
  const [busqueda, setBusqueda] = useState('')
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const cargar = async (q = '') => {
    setLoading(true)
    try {
      const url = q ? `/api/productos?nombre=${encodeURIComponent(q)}` : '/api/productos'
      const res = await api.get(url)
      setProductos(res.data)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error cargando productos')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const onEliminar = async (id) => {
    if (!confirm('¿Eliminar este producto?')) return
    try {
      await api.delete(`/api/productos/${id}`)
      setProductos(productos.filter(p => p.id !== id))
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo eliminar')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><i className="bi bi-tags-fill me-2 text-primary"></i>Productos</h2>
        {isAdmin() && (
          <Link to="/productos/nuevo" className="btn btn-success">
            <i className="bi bi-plus-circle me-1"></i>Nuevo
          </Link>
        )}
      </div>

      <div className="input-group mb-3">
        <span className="input-group-text"><i className="bi bi-search"></i></span>
        <input
          className="form-control"
          placeholder="Buscar por nombre..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && cargar(busqueda)}
        />
        <button className="btn btn-outline-primary" onClick={() => cargar(busqueda)}>Buscar</button>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center"><div className="spinner-border text-primary"></div></div>
      ) : productos.length === 0 ? (
        <div className="alert alert-info">No hay productos.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-hover bg-white shadow-sm">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Nombre</th>
                <th>Categoría</th>
                <th>Talla</th>
                <th>Color</th>
                <th>Precio</th>
                <th>Stock</th>
                {isAdmin() && <th>Acciones</th>}
              </tr>
            </thead>
            <tbody>
              {productos.map(p => (
                <tr key={p.id}>
                  <td>{p.id}</td>
                  <td><strong>{p.nombre}</strong></td>
                  <td><span className="badge bg-secondary">{p.categoriaNombre}</span></td>
                  <td>{p.talla || '-'}</td>
                  <td>{p.color || '-'}</td>
                  <td>${Number(p.precio).toLocaleString('es-CL')}</td>
                  <td>{p.stock}</td>
                  {isAdmin() && (
                    <td className="table-actions">
                      <button className="btn btn-sm btn-warning" onClick={() => navigate(`/productos/${p.id}/editar`)}>
                        <i className="bi bi-pencil"></i>
                      </button>
                      <button className="btn btn-sm btn-danger" onClick={() => onEliminar(p.id)}>
                        <i className="bi bi-trash"></i>
                      </button>
                    </td>
                  )}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
