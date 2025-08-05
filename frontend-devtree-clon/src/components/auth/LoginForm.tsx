'use client'
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { ErrorMessage } from "../ui/ErrorMessage";
import { GoogleButton } from "../ui/GoogleButton";
import { loginAction, googleAuthAction } from "@/action";
import { useState } from "react";
import { useRouter } from "next/navigation";

type FormInputs = {
  email: string;
  password: string;
}

export const LoginForm = () => {

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const initialValues: FormInputs = {
    email: "",
    password: "",
  }

  const {
    reset,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialValues
  })

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await loginAction(data);

    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return
    }
    toast.success(res.message);

    localStorage.setItem("authToken", res.user.token);
    reset();
    setIsLoading(false);

    router.push("/admin/links");
  };


  const handleGoogleAuth = async () => {
    setIsLoading(true);
    const res = await googleAuthAction();

    if (res.success && res.redirectUrl) {
      window.location.href = res.redirectUrl;
    } else {
      toast.error("Error al iniciar autenticación con Google");
      setIsLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="bg-white px-5 py-20 rounded-lg space-y-10 mt-10"
      noValidate
    >
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("email", {
            required: "El Email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          })}
        />
        {errors.email && (
          <ErrorMessage message={errors.email.message} />
        )}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password de Registro"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("password", {
            required: "El Password es obligatorio",
          })}
        />
        {errors.password && (
          <ErrorMessage message={errors.password.message} />
        )}
      </div>

      <input
        type="submit"
        className={`bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        value={isLoading ? "Cargando..." : "Iniciar Sesión"}
        disabled={isLoading}
      />

      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">O</span>
        </div>
      </div>

      <GoogleButton
        text="Iniciar sesión con Google"
        onClick={handleGoogleAuth}
        isLoading={isLoading}
      />
    </form>
  )
}
