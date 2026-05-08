import { createContext, useCallback, useContext, useMemo, useState } from 'react'
import { authService } from '../services/authService'

const AuthContext = createContext(null)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => JSON.parse(localStorage.getItem('lumina_user') || 'null'))
  const [token, setToken] = useState(() => localStorage.getItem('lumina_token'))

  const persist = (data) => {
    localStorage.setItem('lumina_token', data.token)
    localStorage.setItem('lumina_user', JSON.stringify(data.user))
    setToken(data.token)
    setUser(data.user)
  }

  const login = useCallback(async (payload) => {
    const data = await authService.login(payload)
    persist(data)
    return data.user
  }, [])

  const register = useCallback(async (payload) => {
    const data = await authService.register(payload)
    persist(data)
    return data.user
  }, [])

  const logout = useCallback(() => {
    localStorage.removeItem('lumina_token')
    localStorage.removeItem('lumina_user')
    setToken(null)
    setUser(null)
  }, [])

  const refreshUser = useCallback(async () => {
    const fresh = await authService.me()
    localStorage.setItem('lumina_user', JSON.stringify(fresh))
    setUser(fresh)
    return fresh
  }, [])

  const value = useMemo(
    () => ({ user, token, isAuthenticated: Boolean(token), login, register, logout, refreshUser, setUser }),
    [user, token, login, register, logout, refreshUser],
  )

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => useContext(AuthContext)
