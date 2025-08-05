'use client'

import { useAuthStore } from '@/store/auth.store'
import { useForm } from 'react-hook-form';
import { ErrorMessage } from '../ui/ErrorMessage';
import { updateUserAction } from '@/action/users/update-user';
import { uploadImageAction } from '@/actions/users/upload-image';
import { toast } from 'sonner';
import { useState, useRef } from 'react';
import Image from 'next/image';

type FormInputs = {
  handle: string;
  description: string;
}

export const ProfileForm = () => {
  const { user, setUser } = useAuthStore()
  const [isUploadingImage, setIsUploadingImage] = useState(false)
  const [imagePreview, setImagePreview] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const { register, handleSubmit, formState: { errors } } = useForm<FormInputs>({
    defaultValues: {
      handle: user?.slug || '',
      description: user?.description || '',
    }
  });

  if (!user) {
    return <div>Cargando datos del usuario...</div>
  }

  const handleUserProfileForm = async (data: FormInputs) => {
    const token = localStorage.getItem('authToken')
    if (data.description === user.description && data.handle === user.slug) {
      toast.error('No hay cambios para guardar');
      return
    }
    const res = await updateUserAction({ token: token!, ...data });

    if (!res.success) {
      toast.error(res.message || 'Error al actualizar el perfil');
      return
    }
    setUser(res.user)
    toast.success(res.message)
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      // Validar tipo de archivo
      if (!file.type.startsWith('image/')) {
        toast.error('Solo se permiten archivos de imagen')
        return
      }

      // Validar tamaño (5MB máximo)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('La imagen debe ser menor a 5MB')
        return
      }

      // Crear preview
      const reader = new FileReader()
      reader.onload = (e) => {
        setImagePreview(e.target?.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

  const handleImageUpload = async () => {
    const file = fileInputRef.current?.files?.[0]
    if (!file) {
      toast.error('Selecciona una imagen')
      return
    }

    const token = localStorage.getItem('authToken')
    if (!token) {
      toast.error('No se encontró token de autenticación')
      return
    }

    setIsUploadingImage(true)
    try {
      const res = await uploadImageAction({ token, file })

      if (!res.success) {
        toast.error(res.error || 'Error al subir la imagen')
        return
      }

      setUser(res.data.user)
      toast.success(res.data.message)
      setImagePreview(null)
      if (fileInputRef.current) {
        fileInputRef.current.value = ''
      }
    } catch {
      toast.error('Error inesperado al subir la imagen')
    } finally {
      setIsUploadingImage(false)
    }
  }

  return (
    <form
      className="bg-white p-10 rounded-lg space-y-5"
      onSubmit={handleSubmit(handleUserProfileForm)}
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
          // defaultValue={user.slug}
          {...register("handle", { required: "El Nombre de usuario es obligatorio" })}
        />
        {errors.handle && <ErrorMessage message={errors.handle.message} />}
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
          {...register('description', { required: "La descripción es obligatoria" })}
        />
        {errors.description && <ErrorMessage message={errors.description.message} />}
      </div>

      <div className="grid grid-cols-1 gap-2">
        <label htmlFor="image">Imagen:</label>

        {/* Mostrar imagen actual del usuario o placeholder */}
        {!imagePreview && (
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-2">
              {user.image ? 'Imagen actual:' : 'No tienes imagen de perfil'}
            </p>
            {user.image ? (
              <Image
                src={user.image}
                alt="Imagen actual"
                width={96}
                height={96}
                className="w-24 h-24 object-cover rounded-lg"
              />
            ) : (
              <div className="w-24 h-24 bg-gray-200 rounded-lg flex items-center justify-center">
                <svg
                  className="w-12 h-12 text-gray-400"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            )}
          </div>
        )}

        {/* Mostrar preview de nueva imagen */}
        {imagePreview && (
          <div className="mb-2">
            <p className="text-sm text-gray-600 mb-2">Vista previa:</p>
            <div className="w-24 h-24 rounded-lg overflow-hidden">
              <Image
                src={imagePreview}
                alt="Vista previa"
                width={96}
                height={96}
                className="w-full h-full object-cover"
                unoptimized // Necesario para blob URLs
              />
            </div>
          </div>
        )}

        <input
          ref={fileInputRef}
          id="image"
          type="file"
          name="image"
          className="border-none bg-slate-100 rounded-lg p-2"
          accept="image/*"
          onChange={handleImageChange}
        />

        {imagePreview && (
          <button
            type="button"
            onClick={handleImageUpload}
            disabled={isUploadingImage}
            className="bg-green-500 hover:bg-green-600 disabled:bg-green-300 text-white p-2 rounded-lg font-bold transition-colors"
          >
            {isUploadingImage ? 'Subiendo...' : 'Subir Imagen'}
          </button>
        )}
      </div>

      <input
        type="submit"
        className="bg-cyan-400 p-2 text-lg w-full uppercase text-slate-600 rounded-lg font-bold cursor-pointer"
        value='Guardar Cambios'
      />
    </form>
  )
}
