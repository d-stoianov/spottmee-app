import { EventService } from '@/services/EventService'
import React, { createContext, useContext, useRef } from 'react'
import { useAuth } from './AuthProvider'
import { EventCompareResult, EventPhoto } from '@/services/EventService/types'

interface DashboardContextType {
    createAlbum: (photos: FormData) => Promise<string> // returns album id
    getImagesFromAlbum: (albumId: string) => Promise<EventPhoto[]>
    createCompareProcess: (albumId: string, selfie: FormData) => Promise<string> // returns compare key
    getCompareResult: (
        albumId: string,
        compareKey: string
    ) => Promise<EventCompareResult>
}

const DashboardContext = createContext<DashboardContextType | undefined>(
    undefined
)

export const DashboardProvider = ({
    children,
}: {
    children: React.ReactNode
}) => {
    const eventServiceRef = useRef<EventService | null>(null)

    const { token } = useAuth()

    if (token && !eventServiceRef.current) {
        eventServiceRef.current = new EventService(token)
    }

    const createAlbum = async (photos: FormData) => {
        if (!eventServiceRef.current) throw new Error('EventService not ready')

        const result = await eventServiceRef.current.createEvent(photos)
        return result.eventId
    }

    const getImagesFromAlbum = async (albumId: string) => {
        if (!eventServiceRef.current) throw new Error('EventService not ready')

        return eventServiceRef.current.getImagesForEvent(albumId)
    }

    const createCompareProcess = async (albumId: string, selfie: FormData) => {
        if (!eventServiceRef.current) throw new Error('EventService not ready')

        const result = await eventServiceRef.current.createCompareProcess(
            albumId,
            selfie
        )
        return result.compareKey
    }

    const getCompareResult = async (albumId: string, compareKey: string) => {
        if (!eventServiceRef.current) throw new Error('EventService not ready')

        const result = await eventServiceRef.current.getCompareResult(
            albumId,
            compareKey
        )
        return result
    }

    return (
        <DashboardContext.Provider
            value={{
                createAlbum,
                getImagesFromAlbum,
                createCompareProcess,
                getCompareResult,
            }}
        >
            {children}
        </DashboardContext.Provider>
    )
}

export const useDashboard = () => {
    const context = useContext(DashboardContext)

    if (!context)
        throw new Error('useDashboard must be used within DashboardProvider')

    return context
}
