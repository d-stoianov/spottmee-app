export type CreateEventResponse = {
    eventId: string
    photos: string[]
}

export type EventImagesResponse = {
    photos: string[]
    status: Map<string, boolean>
}

export type CreateEventCompareResponse = {
    compareKey: string
}

export type EventCompareResult = {
    matches: string[]
}