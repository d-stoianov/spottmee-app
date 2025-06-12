export type CreateEventResponse = {
    eventId: string
    photos: string[]
}

export type EventPhoto = {
    fileName: string
    photoUrl: string
    status?: boolean
}

export type EventImagesResponse = EventPhoto[]

export type CreateEventCompareResponse = {
    compareKey: string
}

export type EventCompareResult = {
    matches: EventPhoto[]
    status: boolean
}
