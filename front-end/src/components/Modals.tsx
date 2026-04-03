import { ReactNode } from 'react';
import { IoMdClose } from 'react-icons/io';

type ModalProps = {
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

export default function Modal({ isOpen, onClose, children }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div className="absolute inset-0 bg-gray-500"></div>
      <div className="relative bg-white rounded-xl p-6 w-full z-10">
        <button onClick={onClose} className="absolute top-3 right-3 text-gray-900">
          <IoMdClose />
        </button>
        {children}
      </div>
    </div>
  );
}
