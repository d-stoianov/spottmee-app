import { AuthService } from '@/services/AuthService'
import { User } from '@/services/AuthService/types'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => void
    user: User | null | undefined // User - user is authorized, null - user needs to sign in, undefined - value is unset
    token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authService = new AuthService()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null | undefined>(undefined)

    const signIn = async (email: string, password: string) => {
        const result = await authService.signIn(email, password)

        localStorage.setItem('jwt', result.jwt)

        setToken(result.jwt)
        setUser(result.user)
    }

    const signOut = async () => {
        setToken(null)
        setUser(null)
    }

    const signUp = async (name: string, email: string, password: string) => {
        try {
            const result = await authService.signUp(name, email, password)
            setToken(result.jwt)
            setUser(result.user)
        } catch (error) {
            console.error(error)
        }
    }

    useEffect(() => {
        // runs on auth provider mount
        // sets jwt and user if exists in local storage
        const initializeUserFromLocalStorage = async () => {
            const jwt = localStorage.getItem('jwt')
            if (jwt) {
                try {
                    // get user by jwt. if jwt is invalid - will throw an exception
                    const user = await authService.getUser(jwt)
                    setUser(user)
                    setToken(jwt)
                } catch (error) {
                    console.error('Failed to initialize user:', error)
                    // clear invalid token from storage and protected route will handle the redirect
                    localStorage.removeItem('jwt')
                    setUser(null)
                    setToken(null)
                }
            } else {
                // if no jwt - user needs to sign in
                setUser(null)
                setToken(null)
            }
        }
        initializeUserFromLocalStorage()
    }, [])

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signUp,
                signOut,
                user,
                token,
            }}
        >
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => {
    const context = useContext(AuthContext)

    if (!context) throw new Error('useAuth must be used within AuthProvider')

    return context
}
