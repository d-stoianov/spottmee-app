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
