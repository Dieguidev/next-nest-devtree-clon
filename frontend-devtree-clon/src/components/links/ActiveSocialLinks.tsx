'use client'

import { social } from "@/data/social"
import { SocialLink } from "@/interfaces/social.interface"
import { isValidUrl } from "@/utils"
import Image from "next/image"

export const ActiveSocialLinks = () => {
  // Filtrar solo los enlaces que están habilitados y tienen URL válida
  const activeLinks = social.filter((link: SocialLink) =>
    link.enabled && link.url && isValidUrl(link.url)
  )

  if (activeLinks.length === 0) {
    return null
  }

  return (
    <div className="space-y-4">
      <p className="text-lg text-white font-bold text-center">Redes Sociales</p>
      <div className="flex flex-wrap gap-3 justify-center">
        {activeLinks.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            rel="noopener noreferrer"
            className="bg-white p-3 rounded-lg hover:bg-gray-100 transition-colors duration-200 flex items-center justify-center"
          >
            <Image
              src={`/social/icon_${link.name}.svg`}
              alt={link.name}
              width={24}
              height={24}
              className="w-6 h-6"
            />
          </a>
        ))}
      </div>
    </div>
  )
}
