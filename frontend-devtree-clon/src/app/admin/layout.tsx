// import NavigationTabs from "@/components";
import NavigationTabs from "@/components/admin/NavigationTabs";
import { AuthProvider, ButtonVisitPerfil, PreviousViewProfile } from "@/components";
import Image from "next/image";

import { Toaster } from "sonner";
import Link from "next/link";

export default function AppLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <Link href='/admin/links'>
              <Image
                src="/logo.svg"
                alt="Logo DevTree"
                width={150}
                height={50}
                className="w-full block object-contain"
              />
            </Link>
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <button
              className=" bg-lime-500 p-2 text-slate-800 uppercase font-black text-xs rounded-lg cursor-pointer"
            // onClick={() => { }}
            >
              Cerrar Sesión
            </button>
          </div>
        </div>
      </header>
      <div className="bg-gray-100  min-h-screen py-10">
        <main className="mx-auto max-w-5xl p-10 md:p-0">
          <NavigationTabs />

          <div className="flex justify-end">
            <ButtonVisitPerfil />
          </div>

          <div className="flex flex-col md:flex-row gap-10 mt-10">
            <div className="flex-1 ">
              {children}
            </div>
            <div className="w-full md:w-96 bg-slate-800 px-5 py-10 space-y-6">
              <PreviousViewProfile />
            </div>
          </div>
        </main>
      </div>
      <Toaster position="top-right" />
    </AuthProvider>
  )
}