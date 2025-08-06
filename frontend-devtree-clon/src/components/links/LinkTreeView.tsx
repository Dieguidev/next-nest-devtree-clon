'use client'

import { useEffect } from "react"
import { DevTreeInput } from "./DevTreeInput"
import { useSocialLinksStore } from "@/store/social-link.store"


export const LinkTreeView = () => {
  const {
    socialLinks,
    isLoading,
    isSaving,
    updateLink,
    toggleLink,
    loadSocialLinks,
    saveSocialLinks
  } = useSocialLinksStore()

  // Solo cargar UNA VEZ si no hay datos
  useEffect(() => {
    if (socialLinks.length === 0) {
      const token = localStorage.getItem("authToken")
      if (token) {
        loadSocialLinks(token)
      }
    }
  }, [socialLinks.length, loadSocialLinks])


  const handleUrlchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    updateLink(e.target.name, { url: e.target.value })
  }

  const handleEnableLink = (socialNetworkName: string) => {
    toggleLink(socialNetworkName)
  }

  const handleSaveChanges = async () => {
    const token = localStorage.getItem("authToken")
    if (token) {
      await saveSocialLinks(token)
    }
  }

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center p-10">
          <div className="flex flex-col items-center space-y-3">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-cyan-400"></div>
            <div className="text-lg text-gray-600">Cargando enlaces sociales...</div>
          </div>
        </div>
      ) : (
        <div className="space-y-5">
          {socialLinks.map((link) => (
            <DevTreeInput
              key={link.name}
              link={link}
              handleUrlchange={handleUrlchange}
              handleEnableLink={handleEnableLink}
            />
          ))}

          <button
            onClick={handleSaveChanges}
            disabled={isSaving}
            className={`
              p-3 text-lg w-full uppercase rounded-lg font-bold transition-all duration-200
              ${isSaving
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : 'bg-cyan-400 text-slate-600 hover:bg-cyan-500 cursor-pointer'
              }
            `}
          >
            {isSaving ? (
              <div className="flex items-center justify-center space-x-2">
                <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-slate-600"></div>
                <span>Guardando...</span>
              </div>
            ) : (
              'Guardar Cambios'
            )}
          </button>
        </div>
      )}
    </>
  )
}