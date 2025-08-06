'use client'

import { useRouter } from 'next/navigation';
import React from 'react'

export const ButtonCloseSession = () => {

  const router = useRouter();

  const handleCloseSession = () => {
    localStorage.removeItem('authToken');
    router.push('/');
  }

  return (
    <button
      className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
      onClick={handleCloseSession}
    >
      Cerrar Sesión
    </button>
  )
}
