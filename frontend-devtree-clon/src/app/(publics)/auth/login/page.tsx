import { LoginForm } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  return (
    <>
      <LoginForm />

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