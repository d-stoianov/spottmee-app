import { useState, useEffect } from 'react'

// tailwind default breakpoints
const BREAKPOINTS = {
    sm: 640,
    md: 768,
    lg: 1024,
    xl: 1280,
} as const

type Breakpoint = keyof typeof BREAKPOINTS

const useIsMobile = (breakpoint: Breakpoint = 'lg') => {
    const breakpointWidth = BREAKPOINTS[breakpoint]

    const [isMobile, setIsMobile] = useState(
        window.innerWidth < breakpointWidth
    )

    useEffect(() => {
        const handleResize = () => {
            setIsMobile(window.innerWidth < breakpointWidth)
        }

        window.addEventListener('resize', handleResize)

        return () => {
            window.removeEventListener('resize', handleResize)
        }
    }, [breakpoint])

    return isMobile
}

export default useIsMobile
