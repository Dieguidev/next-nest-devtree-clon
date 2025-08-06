'use client'

import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { GoogleButton } from "../ui/GoogleButton";
import { registerAction, googleAuthAction } from "@/action";
import { toast } from "sonner";
import { useState } from "react";
import { handleStore } from "@/store/handle.store";

type FormInputs = {
  name: string;
  email: string;
  handle: string;
  password: string;
  password_confirmation: string;
}

export const RegisterForm = () => {

  const { handle, setHandle } = handleStore();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: FormInputs = {
    name: "",
    email: "",
    handle: handle,
    password: "",
    password_confirmation: ""
  }

  const {
    reset,
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialValues
  })

  const password = watch("password");

  const onSubmit = async (data: FormInputs) => {
    setIsLoading(true);
    const res = await registerAction(data);
    if (!res.success) {
      toast.error(res.message);
      setIsLoading(false);
      return
    }
    toast.success(res.message);
    reset();
    setHandle('');
    setIsLoading(false);
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
    >
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="name" className="text-2xl text-slate-500">Nombre</label>
        <input
          id="name"
          type="text"
          placeholder="Tu Nombre"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("name", { required: "El nombre es obligatorio" })}
        />
        {errors.name && <ErrorMessage message={errors.name.message} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="email" className="text-2xl text-slate-500">E-mail</label>
        <input
          id="email"
          type="email"
          placeholder="Email de Registro"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("email", {
            required: "El email es obligatorio",
            pattern: {
              value: /\S+@\S+\.\S+/,
              message: "E-mail no válido",
            },
          })}
        />
        {errors.email && <ErrorMessage message={errors.email.message} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="handle" className="text-2xl text-slate-500">Handle</label>
        <input
          id="handle"
          type="text"
          placeholder="Nombre de usuario: sin espacios"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("handle", { required: "El handle es obligatorio" })}
        />
        {errors.handle && <ErrorMessage message={errors.handle.message} />}
      </div>
      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password" className="text-2xl text-slate-500">Password</label>
        <input
          id="password"
          type="password"
          placeholder="Password de Registro"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("password", {
            required: "La contraseña es obligatoria",
            minLength: {
              value: 6,
              message: "La contraseña debe tener al menos 6 caracteres",
            },
          })}
        />
        {errors.password && <ErrorMessage message={errors.password.message} />}
      </div>

      <div className="grid grid-cols-1 space-y-3">
        <label htmlFor="password_confirmation" className="text-2xl text-slate-500">Repetir Password</label>
        <input
          id="password_confirmation"
          type="password"
          placeholder="Repetir Password"
          className="bg-slate-100 border-none p-3 rounded-lg placeholder-slate-400"
          {...register("password_confirmation", {
            required: "La confirmación de la contraseña es obligatoria",
            validate: value =>
              value === password || "Las contraseñas no coinciden",
          })}
        />
        {errors.password_confirmation && <ErrorMessage message={errors.password_confirmation.message} />}
      </div>

      <input
        type="submit"
        className={`bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer ${isLoading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        value={isLoading ? "Cargando..." : "Crear Cuenta"}
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
        text="Registrarse con Google"
        onClick={handleGoogleAuth}
        isLoading={isLoading}
      />
    </form>
  )
}
