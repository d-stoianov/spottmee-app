import { AuthService } from '@/services/AuthService'
import { SignInProvider, User } from '@/services/AuthService/types'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>
    signInWithProvider: (provider: SignInProvider) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => void
    deleteAccount: () => Promise<void>
    user: User | null | undefined // User - user is authorized, null - user needs to sign in, undefined - value is unset
    token: string | null
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

const authService = new AuthService()

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [token, setToken] = useState<string | null>(null)
    const [user, setUser] = useState<User | null | undefined>(undefined)

    // Firebase auth sdk - keeps sessions persisted
    useEffect(() => {
        if (user) return

        const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
            if (firebaseUser) {
                try {
                    // user is signed in, update UI and fetch fresh ID token
                    const jwt = await firebaseUser.getIdToken()
                    const user = await authService.getUser(jwt)
                    setUser(user)
                    setToken(jwt)
                } catch (error) {
                    // user not signed in
                    setUser(null)
                    setToken(null)
                }
            } else {
                // user not signed in
                setUser(null)
                setToken(null)
            }
        })
        return () => unsubscribe()
    }, [])

    const signIn = async (email: string, password: string) => {
        const result = await authService.signIn(email, password)

        setToken(result.jwt)
        setUser(result.user)
    }

    const signInWithProvider = async (provider: SignInProvider) => {
        const result = await authService.signInWithProvider(provider)

        setToken(result.jwt)
        setUser(result.user)
    }

    const signOut = async () => {
        await auth.signOut() // this clears Firebase session properly
        setToken(null)
        setUser(null)
    }

    const signUp = async (name: string, email: string, password: string) => {
        const result = await authService.signUp(name, email, password)
        setToken(result.jwt)
        setUser(result.user)
    }

    const deleteAccount = async () => {
        if (token) {
            await authService.deleteUser(token)
            setUser(null)
            setToken(null)
        }
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signInWithProvider,
                signUp,
                signOut,
                deleteAccount,
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
