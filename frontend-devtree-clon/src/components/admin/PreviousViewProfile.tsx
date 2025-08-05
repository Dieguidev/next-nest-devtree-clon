'use client'

import { useAuthStore } from "@/store/auth.store"
import Image from 'next/image'
import { ActiveSocialLinks } from '../links/ActiveSocialLinks'

export const PreviousViewProfile = () => {
  const { user } = useAuthStore()
  return (
    <>
      <p className="text-4xl text-center text-white">
        {user?.slug}
      </p>

      {user?.image ? (
        <Image
          src={user.image}
          alt='Imagen Perfil'
          width={250}
          height={250}
          className='mx-auto max-w-[250px] object-cover rounded-lg'
        />
      ) : (
        <div className="w-[250px] h-[250px] bg-gray-200 rounded-lg flex items-center justify-center mx-auto">
          <svg
            className="w-24 h-24 text-gray-400"
            fill="currentColor"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
              clipRule="evenodd"
            />
          </svg>
        </div>
      )}

      <p className="text-center text-lg font-black text-white">
        {user?.description || 'No tienes descripción'}
      </p>

      {/* Mostrar enlaces sociales activos */}
      {/* <ActiveSocialLinks /> */}
    </>
  )
}
