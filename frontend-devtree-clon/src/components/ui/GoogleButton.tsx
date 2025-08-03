'use client'

import { FcGoogle } from 'react-icons/fc';

interface GoogleButtonProps {
  text: string;
  onClick: () => void;
  isLoading?: boolean;
}

export const GoogleButton = ({ text, onClick, isLoading = false }: GoogleButtonProps) => {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={isLoading}
      className={`
        w-full flex items-center justify-center gap-3
        bg-white border border-gray-300 
        text-gray-700 font-medium
        px-4 py-3 rounded-lg
        hover:bg-gray-50 hover:border-gray-400
        focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
        transition-all duration-200
        ${isLoading ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
      `}
    >
      <FcGoogle className="text-xl" />
      <span>{isLoading ? 'Cargando...' : text}</span>
    </button>
  );
};
