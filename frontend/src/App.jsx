import { Routes, Route, Navigate } from 'react-router-dom'
import Navbar from './components/Navbar'
import ProtectedRoute from './components/ProtectedRoute'
import Login from './pages/Login'
import Register from './pages/Register'
import ProductosList from './pages/ProductosList'
import ProductoForm from './pages/ProductoForm'
import CategoriasList from './pages/CategoriasList'
import CategoriaForm from './pages/CategoriaForm'
import { useAuth } from './context/AuthContext'

export default function App() {
  const { isAuthenticated } = useAuth()

  return (
    <>
      {isAuthenticated() && <Navbar />}
      <div className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/productos" element={
            <ProtectedRoute><ProductosList /></ProtectedRoute>
          } />
          <Route path="/productos/nuevo" element={
            <ProtectedRoute requireRole="ROLE_ADMIN"><ProductoForm /></ProtectedRoute>
          } />
          <Route path="/productos/:id/editar" element={
            <ProtectedRoute requireRole="ROLE_ADMIN"><ProductoForm /></ProtectedRoute>
          } />

          <Route path="/categorias" element={
            <ProtectedRoute><CategoriasList /></ProtectedRoute>
          } />
          <Route path="/categorias/nuevo" element={
            <ProtectedRoute requireRole="ROLE_ADMIN"><CategoriaForm /></ProtectedRoute>
          } />
          <Route path="/categorias/:id/editar" element={
            <ProtectedRoute requireRole="ROLE_ADMIN"><CategoriaForm /></ProtectedRoute>
          } />

          <Route path="/" element={<Navigate to="/productos" replace />} />
          <Route path="*" element={<Navigate to="/productos" replace />} />
        </Routes>
      </div>
    </>
  )
}
