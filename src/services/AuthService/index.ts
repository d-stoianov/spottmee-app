import {
    signInWithCustomToken,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase'

export class AuthService {
    API_URL = import.meta.env.VITE_API_URL

    public async signIn(email: string, password: string) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const firebaseUser = result.user
        const jwt = await firebaseUser.getIdToken(true)

        const response = await fetch(`${this.API_URL}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })

        const { user } = await response.json()

        return { user, jwt }
    }

    public async signUp(name: string, email: string, password: string) {
        const response = await fetch(`${this.API_URL}/auth/signup`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                name,
                email,
                password,
            }),
        })

        const { user, customToken } = await response.json()

        const userCredential = await signInWithCustomToken(auth, customToken)
        const jwt = await userCredential.user.getIdToken(true)

        return { user, jwt }
    }
}
