'use client'

import { useAuthStore } from '@/store/auth.store'

export const ProfileForm = () => {
  const { user } = useAuthStore()

  if (!user) {
    return <div>Cargando datos del usuario...</div>
  }

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={() => { }}
    >
      <legend className="text-2xl text-slate-800 text-center">Editar Información</legend>
      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="handle"
        >Handle:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="handle o Nombre de Usuario"
          defaultValue={user.slug}
        />
      </div>

      {/* <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="email"
        >Email:</label>
        <input
          type="email"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Email"
          defaultValue={user.email}
          disabled
        />
      </div> */}

      {/* <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="name"
        >Nombre:</label>
        <input
          type="text"
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Nombre"
          defaultValue={user.name}
        />
      </div> */}

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="description"
        >Descripción:</label>
        <textarea
          className="border-none bg-slate-100 rounded-lg p-2"
          placeholder="Tu Descripción"
        />
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label
          htmlFor="image"
        >Imagen:</label>
        <input
          id="image"
          type="file"
          name="image"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={() => { }}
        />
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Guardar Cambios'
      />
    </form>
  )
}
