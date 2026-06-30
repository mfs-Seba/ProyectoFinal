import { Navigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'

export default function ProtectedRoute({ children, requireRole }) {
  const { isAuthenticated, hasRole } = useAuth()

  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />
  }
  if (requireRole && !hasRole(requireRole)) {
    return <Navigate to="/productos" replace />
  }
  return children
}
