import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function Navbar() {
  const { user, isAdmin, logout } = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/login')
  }

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark mb-4">
      <div className="container">
        <Link className="navbar-brand brand-logo" to="/productos">
          <i className="bi bi-bag-heart-fill me-2"></i>Tienda Ropa
        </Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navMenu">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <NavLink className="nav-link" to="/productos">
                <i className="bi bi-tags-fill me-1"></i>Productos
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/categorias">
                <i className="bi bi-collection-fill me-1"></i>Categorías
              </NavLink>
            </li>
          </ul>
          {user && (
            <div className="d-flex align-items-center">
              <span className="text-white me-3">
                <i className="bi bi-person-circle me-1"></i>
                {user.username}
                <span className={`badge ms-2 ${isAdmin() ? 'bg-warning text-dark' : 'bg-info'}`}>
                  {isAdmin() ? 'ADMIN' : 'USER'}
                </span>
              </span>
              <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>
                <i className="bi bi-box-arrow-right me-1"></i>Cerrar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
