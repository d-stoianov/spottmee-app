import { AuthService } from '@/services/AuthService'
import { User } from '@/services/AuthService/types'
import React, { createContext, useContext, useState } from 'react'

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => void
    user: User | null
    token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authService = new AuthService()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null>(null)

    const signIn = async (email: string, password: string) => {
        const result = await authService.signIn(email, password)

        setToken(result.jwt)
        setUser(result.user)
    }

    const signOut = async () => {
        setToken(null)
        setUser(null)
    }

    const signUp = async (name: string, email: string, password: string) => {
        const result = await authService.signUp(name, email, password)

        setToken(result.jwt)
        setUser(result.user)
    }

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
