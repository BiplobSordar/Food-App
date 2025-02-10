import { X } from 'lucide-react';
import React from 'react';
import { createPortal } from 'react-dom';

const Modal = ({ isOpen, onClose, children }: { isOpen: boolean, onClose: () => void, children: React.ReactNode }) => {
    if (!isOpen) return null;

    return createPortal(
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="relative bg-white rounded-lg shadow-lg w-full max-w-lg">
                <button
                    onClick={onClose}
                    className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
                >
                    <X/>
                </button>
                <div className="p-4">{children}</div>
            </div>
        </div>,
        document.body
    );
};

export default Modal;
