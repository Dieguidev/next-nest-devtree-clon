import Image from "next/image";
import { Toaster } from "sonner";

export default function AuthLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <div className='bg-slate-800 min-h-screen'>
        <div className='max-w-lg mx-auto pt-10 px-5'>
          <Image
            src='/Logo.svg'
            alt='Logotipo Devtree'
            width={500} // Ajusta el ancho según sea necesario
            height={500} // Ajusta la altura según sea necesario
          />
          <div className='py-10'>
            {children}

          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
}