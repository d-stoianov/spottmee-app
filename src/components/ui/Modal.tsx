import { X } from 'lucide-react'
import { motion } from 'motion/react'
import { useEffect } from 'react'

export type ModalProps = {
    title?: string
    children: React.ReactNode
    onClose: () => void
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape') {
                onClose()
            }
        }

        document.addEventListener('keydown', handleKeyDown)
        return () => {
            document.removeEventListener('keydown', handleKeyDown)
        }
    }, [onClose])

    return (
        <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
        >
            <motion.div
                className="relative w-full max-w-md rounded-2xl bg-white p-6 shadow-lg"
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: 50, opacity: 0 }}
                transition={{ duration: 0.25 }}
                onClick={(e) => e.stopPropagation()}
            >
                {title && (
                    <div className="mb-4 flex items-center justify-between">
                        <h2 className="text-lg font-semibold">{title}</h2>
                        <button
                            className="rounded-full p-1 text-gray-500 hover:bg-gray-100"
                            onClick={onClose}
                        >
                            <X className="h-5 w-5" />
                        </button>
                    </div>
                )}
                <div>{children}</div>
            </motion.div>
        </motion.div>
    )
}

export default Modal
