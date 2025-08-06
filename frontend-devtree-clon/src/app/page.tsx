import Image from "next/image";
import Link from "next/link";

export default function HomePage() {
  return (
    <>
      <header className="bg-slate-800 py-5">
        <div className="mx-auto max-w-5xl flex flex-col md:flex-row items-center md:justify-between">
          <div className="w-full p-5 lg:p-0 md:w-1/3">
            <Image
              src="/logo.svg"
              alt="Logo DevTree"
              width={150}
              height={50}
              className="w-full block object-contain"
            />
          </div>
          <div className="md:w-1/3 md:flex md:justify-end">
            <Link
              className='text-white p-2 uppercase font-black text-xs cursor-pointer'
              href={'/auth/login'}
            >Iniciar Sesión</Link>

            <Link
              className='bg-lime-500 text-slate-800 p-2 uppercase font-black text-xs cursor-pointer rounded-lg'
              href={'/auth/register'}
            >Registrarme</Link>
          </div>
        </div>
      </header>

      <main className="bg-gray-100 py-10 min-h-screen bg-pattern">
        <div className="max-w-5xl mx-auto mt-10">
          <div className="lg:w-1/2 px-10 lg:p-0 space-y-6">
            <h1 className="text-6xl font-black">
              Todas tus <span className="text-cyan-600">Redes Sociales </span>
              en un enlace
            </h1>
            <p className="text-slate-800 text-xl">
              Únete a más de 200 mil developers compartiendo sus redes sociales, comparte tu perfil de TikTok, Facebook, Instagram, YouTube, Github y más
            </p>
          </div>
        </div>
      </main>
    </>
  );
}