// DTO coming from the API
export type UserDTO = {
    id: number
    uuid: string
    name: string
    email: string
    createdAt: string // timestamp string from the API
}

// user with parsed JS Date object
export type User = Omit<UserDTO, 'createdAt'> & {
    createdAt: Date
}

export type SignUpResponse = {
    user: UserDTO
    customToken: string // temporary token. need refresh to get JWT
}

const AUTH_ERRORS = [
    'INCORRECT_DATA_TYPE',
    'MISSING_EMAIL_OR_PASSWORD',
    'USER_ALREADY_EXISTS',
    'INVALID_PASSWORD',
    'INVALID_EMAIL',
    'INVALID_NAME',
    'UNKNOWN_ERROR',
] as const

export type AuthError = (typeof AUTH_ERRORS)[number]

export type AuthErrorResponse = {
    code: AuthError
    message: string
}
