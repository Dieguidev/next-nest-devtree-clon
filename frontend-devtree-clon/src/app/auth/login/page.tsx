import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <h1 className='text-4xl text-white font-bold'>
        Iniciar Sesión
      </h1>

      <div className="mt-10">
        <Link
          href="/auth/register"
          className='text-center text-white text-lg block'
        >
          ¿No tienes una cuenta? Regístrate
        </Link>
      </div>
    </>
  );
}