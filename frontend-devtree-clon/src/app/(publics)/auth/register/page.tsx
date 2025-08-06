
import { RegisterForm } from "@/components";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <>
      <h1 className='text-4xl text-white font-bold'>
        Crear Cuenta
      </h1>

      <RegisterForm />

      <div className="mt-10">

        <Link
          className='text-center text-white text-lg block'
          href="/auth/login"
        >
          ¿Ya tienes una cuenta? Inicia sesión
        </Link>
      </div>
    </>
  );
}