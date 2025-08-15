import {
    CreateEventCompareResponse,
    CreateEventResponse,
    EventCompareResult,
    EventImagesResponse,
} from '@/services/EventService/types'

export class EventService {
    private API_URL = `${import.meta.env.VITE_API_URL}/event`
    private JWT_TOKEN

    constructor(JWT_TOKEN: string) {
        this.JWT_TOKEN = JWT_TOKEN
    }

    public async createEvent(formData: FormData): Promise<CreateEventResponse> {
        const response = await fetch(this.API_URL, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${this.JWT_TOKEN}`,
            },
        })

        const data: CreateEventResponse = await response.json()
        return data
    }

    public async getImagesForEvent(
        eventId: string
    ): Promise<EventImagesResponse> {
        const response = await fetch(`${this.API_URL}/${eventId}`, {
            method: 'GET',
            headers: {
                Authorization: `Bearer ${this.JWT_TOKEN}`,
            },
        })

        const data: EventImagesResponse = await response.json()
        return data
    }

    public async createCompareProcess(
        eventId: string,
        formData: FormData
    ): Promise<CreateEventCompareResponse> {
        const response = await fetch(`${this.API_URL}/${eventId}`, {
            method: 'POST',
            body: formData,
            headers: {
                Authorization: `Bearer ${this.JWT_TOKEN}`,
            },
        })

        const data: CreateEventCompareResponse = await response.json()
        return data
    }

    public async getCompareResult(
        eventId: string,
        compareKey: string
    ): Promise<EventCompareResult> {
        const response = await fetch(
            `${this.API_URL}/${eventId}/${compareKey}`,
            {
                headers: {
                    Authorization: `Bearer ${this.JWT_TOKEN}`,
                },
            }
        )

        const data: EventCompareResult = await response.json()
        return data
    }
}
