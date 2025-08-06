'use client'

import { useAuthStore } from "@/store/auth.store"
import Link from "next/link"


export const ButtonVisitPerfil = () => {

  const { user } = useAuthStore();

  return (
    <Link
      className="font-bold text-right text-slate-800 text-2xl"
      href={`/${user?.slug}`}
      target="_blank"
      rel="noreferrer noopener"
    >Visitar Mi Perfil / {user?.slug}</Link>
  )
}
