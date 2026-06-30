import { createContext, useContext, useEffect, useState } from 'react'
import api from '../api/axios'

const AuthContext = createContext(null)

function decodeJwt(token) {
  try {
    const payload = token.split('.')[1]
    const json = atob(payload.replace(/-/g, '+').replace(/_/g, '/'))
    return JSON.parse(decodeURIComponent(escape(json)))
  } catch {
    return null
  }
}

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem('token'))
  const [user, setUser] = useState(null)

  useEffect(() => {
    if (token) {
      const payload = decodeJwt(token)
      if (payload && payload.exp * 1000 > Date.now()) {
        setUser({
          username: payload.sub,
          roles: payload.roles || [],
        })
      } else {
        logout()
      }
    } else {
      setUser(null)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token])

  const login = async (username, password) => {
    const res = await api.post('/auth/login', { username, password })
    const newToken = res.data.token
    localStorage.setItem('token', newToken)
    setToken(newToken)
  }

  const logout = () => {
    localStorage.removeItem('token')
    setToken(null)
    setUser(null)
  }

  const hasRole = (rol) => user?.roles?.includes(rol)
  const isAdmin = () => hasRole('ROLE_ADMIN')
  const isAuthenticated = () => !!user

  return (
    <AuthContext.Provider value={{ user, token, login, logout, hasRole, isAdmin, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}
