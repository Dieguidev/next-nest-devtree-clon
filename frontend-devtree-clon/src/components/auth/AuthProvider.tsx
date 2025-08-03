'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { useAuthStore } from '@/store/auth.store'
import { getUser } from '@/action'

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const { setUser, setLoading, isLoading } = useAuthStore()
  const router = useRouter()
  const [isInitialized, setIsInitialized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      try {
        // Obtener token del localStorage
        const token = localStorage.getItem('authToken')

        if (!token) {

          setUser(null)
          setIsInitialized(true)
          router.push('/auth/login')
          return
        }


        // Llamar al server action pasando el token
        const userData = await getUser(token)



        if (userData && !userData.error) {
          setUser(userData)
          setIsInitialized(true)
        } else {
          // Token inválido o expirado

          localStorage.removeItem('authToken')
          setUser(null)
          setIsInitialized(true)
          router.push('/auth/login')
        }
      } catch (error) {
        console.error('Error verificando autenticación:', error)
        localStorage.removeItem('authToken')
        setUser(null)
        setIsInitialized(true)
        router.push('/auth/login')
      }
    }

    checkAuth()
  }, [setUser, setLoading, router])

  // Mostrar loading mientras verifica la autenticación
  if (isLoading || !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Verificando autenticación...</div>
      </div>
    )
  }

  return <>{children}</>
}
