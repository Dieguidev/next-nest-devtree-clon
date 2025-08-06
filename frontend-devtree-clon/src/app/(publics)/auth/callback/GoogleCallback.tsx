'use client';

import { useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { toast } from 'sonner';

export default function GoogleCallback() {
  const searchParams = useSearchParams();
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Obtener los parámetros de la URL
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          toast.error('Error en la autenticación con Google');
          router.push('/auth/login');
          return;
        }

        if (token && userParam) {
          // Guardar el token en localStorage
          localStorage.setItem('authToken', token);

          // Parsear la información del usuario
          const user = JSON.parse(decodeURIComponent(userParam));

          toast.success(`¡Bienvenido, ${user.name}!`);
          // Redirigir al dashboard o página principal
          router.push('/admin/links'); // Cambiar por la ruta que corresponda
        } else {
          toast.error('No se recibió información de autenticación');
          router.push('/auth/login');
        }
      } catch (error) {
        console.error('Error processing Google callback:', error);
        toast.error('Error procesando la autenticación');
        router.push('/auth/login');
      }
    };

    handleCallback();
  }, [searchParams, router]);

  return (
    <div className="min-h-screen bg-slate-800 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-cyan-400 mx-auto mb-4"></div>
        <p className="text-slate-600">Procesando autenticación con Google...</p>
      </div>
    </div>
  );
}
