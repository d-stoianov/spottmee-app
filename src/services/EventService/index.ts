import {
    CreateEventCompareResponse,
    CreateEventResponse,
    EventCompareResult,
    EventImagesResponse,
} from '@/services/EventService/types'

export class EventService {
    API_URL = import.meta.env.VITE_API_URL

    public async createEvent(formData: FormData): Promise<CreateEventResponse> {
        const response = await fetch(`${this.API_URL}/register`, {
            method: 'POST',
            body: formData,
        })

        const data: CreateEventResponse = await response.json()
        return data
    }

    public async getImagesForEvent(
        eventId: string
    ): Promise<EventImagesResponse> {
        const response = await fetch(`${this.API_URL}/event/${eventId}`, {
            method: 'GET',
        })

        const data: EventImagesResponse = await response.json()
        return data
    }

    public async createCompareProcess(
        eventId: string,
        formData: FormData
    ): Promise<CreateEventCompareResponse> {
        const response = await fetch(`${this.API_URL}/event/${eventId}`, {
            method: 'POST',
            body: formData,
        })

        const data: CreateEventCompareResponse = await response.json()
        return data
    }

    public async getCompareResult(
        eventId: string,
        compareKey: string
    ): Promise<EventCompareResult> {
        const response = await fetch(
            `${this.API_URL}/event/${eventId}/${compareKey}`
        )

        const data: EventCompareResult = await response.json()
        return data
    }
}
