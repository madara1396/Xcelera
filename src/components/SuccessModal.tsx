import React from 'react';
import { CheckCircle } from 'lucide-react';

type SuccessModalProps = {
  isOpen: boolean;
  onClose: () => void;
  studentName: string;
  grade: string;
};

const SuccessModal: React.FC<SuccessModalProps> = ({ isOpen, onClose, studentName, grade }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-xl animate-slideIn">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center">
            <CheckCircle size={40} className="text-green-500" />
          </div>
        </div>
        
        <h2 className="text-2xl font-bold text-green-600 text-center mb-4">Registration Complete!</h2>
        
        <p className="text-center text-gray-700 mb-6">
          Thank you, <span className="font-semibold">{studentName}</span>! Your Grade{' '}
          <span className="font-semibold">{grade}</span> registration has been successfully submitted.
        </p>
        
        <div className="bg-gray-50 p-4 rounded-lg mb-6">
          <p className="text-gray-600 text-center">
            Our team will review your details and contact you shortly on the number you provided.
          </p>
        </div>
        
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-green-500 hover:bg-green-600 text-white font-medium rounded-lg transition-all transform hover:-translate-y-1 hover:shadow-lg"
        >
          Complete
        </button>
      </div>
    </div>
  );
};

export default SuccessModal;