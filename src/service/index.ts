import { CreateEventResponse, EventImagesResponse } from '@/service/types'

export class EventifyService {
    API_URL = import.meta.env.VITE_API_URL

    static getHostedImageFileName(imgPath: string): string {
        const splittedImage = imgPath.split('/')
        const fileName = splittedImage[splittedImage.length - 1]

        return fileName
    }

    public async createEvent(formData: FormData): Promise<CreateEventResponse> {
        try {
            const response = await fetch(`${this.API_URL}/register`, {
                method: 'POST',
                body: formData,
            })

            const data: CreateEventResponse = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    public async getImagesForEvent(
        eventId: string
    ): Promise<EventImagesResponse> {
        try {
            const response = await fetch(`${this.API_URL}/event/${eventId}`, {
                method: 'GET',
            })

            const data: EventImagesResponse = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    public async getImagesBySelfieForEvent(
        eventId: string,
        formData: FormData
    ): Promise<EventImagesResponse> {
        try {
            const response = await fetch(`${this.API_URL}/event/${eventId}`, {
                method: 'POST',
                body: formData,
            })

            const data: EventImagesResponse = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }
}
