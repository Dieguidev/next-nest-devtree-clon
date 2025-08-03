'use client'

import { useForm } from "react-hook-form";
import { ErrorMessage } from "../ui/ErrorMessage";
import { registerAction } from "@/action";

type FormInputs = {
  name: string;
  email: string;
  handle: string;
  password: string;
  password_confirmation: string;
}

export const RegisterForm = () => {

  const initialValues: FormInputs = {
    name: "",
    email: "",
    handle: "",
    password: "",
    password_confirmation: ""
  }

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormInputs>({
    defaultValues: initialValues
  })

  const password = watch("password");

  const onSubmit = async (data: FormInputs) => {
    const res = await registerAction(data);
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
        className="bg-cyan-400 p-3 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Crear Cuenta'
      />
    </form>
  )
}
