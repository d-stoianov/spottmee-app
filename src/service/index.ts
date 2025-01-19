import { CreateEventResponse, GetEventImagesResponse } from '@/service/types'

export class EventifyService {
    API_URL = import.meta.env.VITE_API_URL

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
    ): Promise<GetEventImagesResponse> {
        try {
            const response = await fetch(`${this.API_URL}/event/${eventId}`, {
                method: 'GET',
            })

            const data: GetEventImagesResponse = await response.json()
            return data
        } catch (error) {
            throw error
        }
    }

    static getHostedImageFileName(imgPath: string): string {
        const splittedImage = imgPath.split('/')
        const fileName = splittedImage[splittedImage.length - 1]

        return fileName
    }
}
