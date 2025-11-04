import React, { ReactNode } from "react";

type ModalProps = {
  open: boolean;
  onClose: () => void;
  children: ReactNode;
};

const Modal: React.FC<ModalProps> = ({ open, onClose, children }) => {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-md bg-opacity-30">
      <div className="relative bg-white rounded-2xl p-6 shadow-xl w-full max-w-4xl mx-4">
        <button
          className="absolute top-3 right-4 text-2xl text-gray-400 hover:text-gray-600"
          onClick={onClose}
        >
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};

export default Modal;
