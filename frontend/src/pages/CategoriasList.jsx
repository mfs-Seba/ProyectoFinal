import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import api from '../api/axios'
import { useAuth } from '../context/AuthContext'

export default function CategoriasList() {
  const { isAdmin } = useAuth()
  const navigate = useNavigate()
  const [items, setItems] = useState([])
  const [error, setError] = useState(null)
  const [loading, setLoading] = useState(true)

  const cargar = async () => {
    setLoading(true)
    try {
      const res = await api.get('/api/categorias')
      setItems(res.data)
    } catch (err) {
      setError(err.response?.data?.mensaje || 'Error')
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { cargar() }, [])

  const onEliminar = async (id) => {
    if (!confirm('¿Eliminar esta categoría?')) return
    try {
      await api.delete(`/api/categorias/${id}`)
      setItems(items.filter(c => c.id !== id))
    } catch (err) {
      alert(err.response?.data?.mensaje || 'No se pudo eliminar')
    }
  }

  return (
    <div>
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h2><i className="bi bi-collection-fill me-2 text-primary"></i>Categorías</h2>
        {isAdmin() && (
          <Link to="/categorias/nuevo" className="btn btn-success">
            <i className="bi bi-plus-circle me-1"></i>Nueva
          </Link>
        )}
      </div>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-center"><div className="spinner-border text-primary"></div></div>
      ) : (
        <table className="table table-hover bg-white shadow-sm">
          <thead className="table-dark">
            <tr>
              <th>#</th>
              <th>Nombre</th>
              <th>Descripción</th>
              {isAdmin() && <th>Acciones</th>}
            </tr>
          </thead>
          <tbody>
            {items.map(c => (
              <tr key={c.id}>
                <td>{c.id}</td>
                <td><strong>{c.nombre}</strong></td>
                <td>{c.descripcion}</td>
                {isAdmin() && (
                  <td className="table-actions">
                    <button className="btn btn-sm btn-warning" onClick={() => navigate(`/categorias/${c.id}/editar`)}>
                      <i className="bi bi-pencil"></i>
                    </button>
                    <button className="btn btn-sm btn-danger" onClick={() => onEliminar(c.id)}>
                      <i className="bi bi-trash"></i>
                    </button>
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}
