import {
    signInWithCustomToken,
    signInWithEmailAndPassword,
} from 'firebase/auth'
import { auth } from '../firebase'
import { SignUpResponse, User, UserDTO } from './types'

export class AuthService {
    private API_URL = import.meta.env.VITE_API_URL

    public async signIn(email: string, password: string) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const firebaseUser = result.user
        const jwt = await firebaseUser.getIdToken()
        const user = await this.getUser(jwt)

        return { user, jwt }
    }

    public async signUp(
        name: string,
        email: string,
        password: string
    ): Promise<{
        user: User
        jwt: string
    }> {
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

        if (!response.ok) {
            throw new Error('Failed to sign up')
        }

        const signUpResponse: SignUpResponse = await response.json()

        const userCredential = await signInWithCustomToken(
            auth,
            signUpResponse.customToken
        )
        const jwt = await userCredential.user.getIdToken()

        return { user: this.userDTOToUser(signUpResponse.user), jwt }
    }

    public async getUser(jwt: string): Promise<User> {
        const response = await fetch(`${this.API_URL}/user`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to get user')
        }

        const userDTO: UserDTO = await response.json()

        return this.userDTOToUser(userDTO)
    }

    private userDTOToUser(userDTO: UserDTO): User {
        return {
            ...userDTO,
            createdAt: new Date(userDTO.createdAt),
        }
    }
}
