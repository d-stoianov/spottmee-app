import { CreateEventResponse } from '@/service/types'

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
}
