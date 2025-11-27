'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'

interface User {
  id: number;
  name: string;
  email: string;
  is_admin: boolean;
}

export function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null)
  const [user, setUser] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    checkAuth()
  }, [])

  const checkAuth = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      const storedUser = localStorage.getItem('admin-user')

      if (token && storedUser) {
        setIsAuthenticated(true)
        setUser(JSON.parse(storedUser))
        
        try {
          const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/check-auth`, {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Accept': 'application/json',
            },
          })

          if (response.ok) {
            const data = await response.json()
            if (data.success) {
              setIsAuthenticated(true)
              setUser(data.user)
              localStorage.setItem('admin-user', JSON.stringify(data.user))
            } else {
              logout()
            }
          } else {
            logout()
          }
        } catch (error) {
          console.error('Auth check failed:', error)
          setIsAuthenticated(true)
        }
      } else {
        setIsAuthenticated(false)
      }
    } catch (error) {
      console.error('Auth check failed:', error)
      setIsAuthenticated(false)
    } finally {
      setLoading(false)
    }
  }

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      console.log('🔐 Sending login request to:', `${process.env.NEXT_PUBLIC_API_URL}/admin/login`)
      
      const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      })

      console.log('📡 Login response status:', response.status)
      
      if (response.status === 422) {
        const errorData = await response.json()
        console.error('❌ Validation error:', errorData)
        throw new Error('422 Validation Error: ' + JSON.stringify(errorData))
      }

      if (!response.ok) {
        throw new Error(`Login failed with status: ${response.status}`)
      }

      const data = await response.json()
      console.log('📡 Login response data:', data)

      if (data.success && data.token) {
        setIsAuthenticated(true)
        setUser(data.user)
        localStorage.setItem('admin-token', data.token)
        localStorage.setItem('admin-authenticated', 'true')
        localStorage.setItem('admin-user', JSON.stringify(data.user))
        console.log('✅ Token stored successfully')
        
        // Redirect to dashboard after successful login
        console.log('🔄 Redirecting to dashboard...')
        router.push('/admin')
        return true
      } else {
        console.error('❌ Login failed - no token in response')
        return false
      }
    } catch (error) {
      console.error('❌ Login error:', error)
      throw error
    }
  }

  const logout = async () => {
    try {
      const token = localStorage.getItem('admin-token')
      if (token) {
        await fetch(`${process.env.NEXT_PUBLIC_API_URL}/admin/logout`, {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${token}`,
          },
        })
      }
    } catch (error) {
      console.error('Logout error:', error)
    } finally {
      setIsAuthenticated(false)
      setUser(null)
      localStorage.removeItem('admin-token')
      localStorage.removeItem('admin-authenticated')
      localStorage.removeItem('admin-user')
      localStorage.removeItem('admin-notifications')
      localStorage.removeItem('admin-prev-stats')
      router.push('/admin/login')
    }
  }

  return {
    isAuthenticated,
    user,
    loading,
    login,
    logout,
    checkAuth
  }
}