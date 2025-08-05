'use client'

import { useState } from "react"

import { social } from "@/data/social"
import { isValidUrl } from "@/utils"
import { toast } from "sonner"
import { DevTreeInput } from "./DevTreeInput"

export const LinkTreeView = () => {
  const [devTreeLinks, setDevTreeLinks] = useState(social)

  const handleUrlchange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const updatedLinks = devTreeLinks.map(link => link.name === e.target.name ? { ...link, url: e.target.value } : link);

    setDevTreeLinks(updatedLinks);
  }

  const handleEnableLink = (socialNetworName: string) => {
    const updatedLinks = devTreeLinks.map(link => {
      if (link.name === socialNetworName) {
        if (isValidUrl(link.url)) {
          return { ...link, enabled: !link.enabled }
        } else {
          toast.error(`La URL de ${link.name} no es válida`)
        }
      }
      return link
    })

    setDevTreeLinks(updatedLinks);
  }

  return (
    <>
      <div className="space-y-5">
        {devTreeLinks.map((link) => (
          <DevTreeInput
            key={link.name}
            link={link}
            handleUrlchange={handleUrlchange}
            handleEnableLink={handleEnableLink}
          />
        ))}
        <button
          className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded font-bold"
        >Guardar Cambios</button>
      </div>
    </>
  )
}
