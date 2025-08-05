"use server";

import { SocialLink } from "@/interfaces/social.interface";

interface GetSocialLinksResponse {
  success: boolean;
  message: string;
  socialLinks: (SocialLink & { position: number })[] | null;
}

export async function getSocialLinks(
  token: string
): Promise<GetSocialLinksResponse> {
  if (!token) {
    return {
      success: false,
      message: "Token de autenticación requerido",
      socialLinks: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/social-links`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      if (response.status === 401) {
        return {
          success: false,
          message: "Token de autenticación inválido o expirado",
          socialLinks: null,
        };
      }

      if (response.status === 500) {
        return {
          success: false,
          message:
            "Error de comunicación con el servidor. Por favor, intenta más tarde.",
          socialLinks: null,
        };
      }

      return {
        success: false,
        message: "Error al obtener los enlaces sociales",
        socialLinks: null,
      };
    }

    const data = await response.json();

    // El backend siempre devuelve un array, vacío si no hay enlaces
    return {
      success: true,
      message:
        data.length === 0
          ? "No tienes enlaces sociales configurados aún"
          : "Enlaces sociales obtenidos correctamente",
      socialLinks: data,
    };
  } catch (error) {
    console.error("Error fetching social links:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      socialLinks: null,
    };
  }
}
