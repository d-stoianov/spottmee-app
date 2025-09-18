import React, { useEffect, useRef, useState } from 'react'
import { Typography } from '@/components/ui/Typography.tsx'
import { useTranslation } from 'react-i18next'

type CameraCaptureProps = {
    onCapture: (imageData: string) => void
    resetTrigger?: boolean
}

const CameraCapture: React.FC<CameraCaptureProps> = ({
    onCapture,
    resetTrigger,
}) => {
    const { t } = useTranslation()

    const videoRef = useRef<HTMLVideoElement>(null)
    const canvasRef = useRef<HTMLCanvasElement>(null)
    const [capturedImage, setCapturedImage] = useState<string | null>(null)

    useEffect(() => {
        navigator.mediaDevices
            .getUserMedia({ video: true })
            .then((stream) => {
                if (videoRef.current) {
                    videoRef.current.srcObject = stream
                }
            })
            .catch((err) => {
                console.error('Error accessing webcam:', err)
            })
    }, [])

    const captureImage = () => {
        if (videoRef.current && canvasRef.current) {
            const video = videoRef.current
            const canvas = canvasRef.current
            const context = canvas.getContext('2d')

            if (context) {
                canvas.width = video.videoWidth
                canvas.height = video.videoHeight
                context.drawImage(video, 0, 0, canvas.width, canvas.height)
                const imageData = canvas.toDataURL('image/png')
                setCapturedImage(imageData)
                onCapture(imageData)
            }
        }
    }

    useEffect(() => {
        if (resetTrigger) {
            setCapturedImage(null)
        }
    }, [resetTrigger])

    return (
        <>
            <div className={'flex flex-col items-center gap-6'}>
                <video
                    ref={videoRef}
                    autoPlay
                    playsInline
                    className={'rounded-[1.25rem]'}
                    // important to hide it via css. if doing it with conditional rerender,
                    // then need to ask for permissions again
                    style={{
                        display: capturedImage ? 'none' : 'block',
                    }}
                />
                {capturedImage && (
                    <img
                        src={capturedImage}
                        alt="Captured"
                        className={'rounded-[1.25rem]'}
                    />
                )}
                <button onClick={captureImage}>
                    <Typography
                        className={'px-6 text-white'}
                        variant={'buttonText'}
                    >
                        {t('spot.capture')}
                    </Typography>
                </button>
            </div>
            {/* hidden canvas for drawing captured image */}
            <canvas ref={canvasRef} style={{ display: 'none' }} />
        </>
    )
}

export default CameraCapture
