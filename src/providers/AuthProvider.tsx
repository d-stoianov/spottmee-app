import { AuthService } from '@/services/AuthService'
import {
    SignInProvider,
    UpdateUserDTO,
    User,
} from '@/services/AuthService/types'
import { auth } from '@/services/firebase'
import { onAuthStateChanged } from 'firebase/auth'
import React, { createContext, useContext, useEffect, useState } from 'react'

interface AuthContextType {
    signIn: (email: string, password: string) => Promise<void>
    signInWithProvider: (provider: SignInProvider) => Promise<void>
    signUp: (name: string, email: string, password: string) => Promise<void>
    signOut: () => void
    deleteAccount: () => Promise<void>
    updateUser: (updateUserDTO: UpdateUserDTO) => Promise<void>
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
                    console.error('Error during token refresh', error)
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
        if (!token) {
            return
        }

        await authService.deleteUser(token)

        setUser(null)
        setToken(null)
    }

    const updateUser = async (updateUserDTO: UpdateUserDTO) => {
        if (!token) return

        const { name, picture } = updateUserDTO
        const formData = new FormData()

        // check if prev user values are not the same as new ones
        // to avoid extra requests

        if (name !== undefined && user?.name !== name) {
            formData.append('name', name)
        }

        if (picture !== undefined) {
            formData.append('picture', picture)
        }

        // don't make empty fetch
        if ([...formData.keys()].length === 0) return

        const updatedUser = await authService.updateUser(token, formData)

        setUser(updatedUser)
    }

    return (
        <AuthContext.Provider
            value={{
                signIn,
                signInWithProvider,
                signUp,
                signOut,
                deleteAccount,
                updateUser,
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
