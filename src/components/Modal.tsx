import ReactDOM from 'react-dom'

interface ModalProps {
    isOpen: boolean
    onClose: () => void
    children: React.ReactNode
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
    return ReactDOM.createPortal(
        <>
            {isOpen && (
                <div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4 transition-opacity duration-300"
                    onClick={onClose}
                >
                    <div
                        className="mx-auto max-w-lg transform rounded-lg bg-white px-14 py-8 shadow-lg transition-transform duration-300"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <button
                            className="absolute right-3 top-3 text-gray-500 hover:text-gray-700"
                            onClick={onClose}
                        >
                            &times;
                        </button>
                        {children}
                    </div>
                </div>
            )}
        </>,
        document.body
    )
}

export default Modal
