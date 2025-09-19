import {
    GoogleAuthProvider,
    signInWithCustomToken,
    signInWithEmailAndPassword,
    signInWithPopup,
} from 'firebase/auth'
import { auth } from '../firebase'
import {
    AuthErrorResponse,
    SignInProvider,
    SignUpResponse,
    User,
    UserDTO,
} from './types'

export class AuthService {
    private API_URL = import.meta.env.VITE_API_URL

    public async signIn(email: string, password: string) {
        const result = await signInWithEmailAndPassword(auth, email, password)
        const firebaseUser = result.user
        const jwt = await firebaseUser.getIdToken()
        const user = await this.getUser(jwt)

        return { user, jwt }
    }

    public async signInWithProvider(provider: SignInProvider) {
        let signInProvider = undefined

        switch (provider) {
            case SignInProvider.Google:
                signInProvider = new GoogleAuthProvider()
                break
        }

        const { user: firebaseUser } = await signInWithPopup(
            auth,
            signInProvider
        )
        const jwt = await firebaseUser.getIdToken()

        try {
            const user = await this.getUser(jwt)
            return { user, jwt }
        } catch {
            // if no user found - try to create one
            const response = await fetch(`${this.API_URL}/auth/sign-up`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${jwt}`,
                    // when passing firebase jwt, backend extracts user info from it to create an account
                },
                body: JSON.stringify({}),
            })

            if (!response.ok) {
                throw new Error('Failed to create user with Google')
            }

            const signUpResponse: SignUpResponse = await response.json()

            return { user: this.userDTOToUser(signUpResponse?.user), jwt }
        }
    }

    public async signUp(
        name: string,
        email: string,
        password: string
    ): Promise<{
        user: User
        jwt: string
    }> {
        const response = await fetch(`${this.API_URL}/auth/sign-up`, {
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
            const authErrorResponse: AuthErrorResponse = await response.json()

            throw authErrorResponse
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

    public async deleteUser(jwt: string): Promise<void> {
        const response = await fetch(`${this.API_URL}/user`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
        })

        if (!response.ok) {
            throw new Error('Failed to delete user')
        }
    }
    public async updateUser(jwt: string, formData: FormData): Promise<User> {
        const response = await fetch(`${this.API_URL}/user`, {
            method: 'PUT',
            headers: {
                Authorization: `Bearer ${jwt}`,
            },
            body: formData,
        })

        if (!response.ok) {
            throw new Error('Failed to update user')
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
