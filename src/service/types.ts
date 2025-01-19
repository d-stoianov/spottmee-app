export type CreateEventResponse = {
    eventId: string
    photos: string[]
}

type EventMessage = 'Success' | 'No matches found'

export type EventImagesResponse = {
    message: EventMessage
    images: string[]
}
