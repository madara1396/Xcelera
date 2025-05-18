import React from 'react';
import { AlertCircle } from 'lucide-react';

type ErrorModalProps = {
  isOpen: boolean;
  onClose: () => void;
  errors: string[];
};

const ErrorModal: React.FC<ErrorModalProps> = ({ isOpen, onClose, errors }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 animate-fadeIn">
      <div className="bg-white p-8 rounded-lg max-w-md w-full mx-4 shadow-xl animate-slideIn">
        <div className="flex justify-center mb-6">
          <div className="w-20 h-20 bg-red-50 rounded-full flex items-center justify-center">
            <AlertCircle size={40} className="text-red-500" />
          </div>
        </div>
        
        <h2 className="text-xl font-bold text-red-500 text-center mb-4">Please Fix the Following Errors:</h2>
        
        <ul className="bg-gray-50 p-4 rounded-lg mb-6 list-disc pl-5">
          {errors.map((error, index) => (
            <li key={index} className="text-gray-600 mb-1 last:mb-0">{error}</li>
          ))}
        </ul>
        
        <button
          onClick={onClose}
          className="w-full py-2.5 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all"
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorModal;