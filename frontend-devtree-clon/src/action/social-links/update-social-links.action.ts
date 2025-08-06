"use server";

import { revalidatePath } from "next/cache";
import { SocialLink } from "@/interfaces/social.interface";

interface UpdateSocialLinksProps {
  token: string;
  socialLinks: (SocialLink & { position?: number })[];
}

interface UpdateSocialLinksResponse {
  success: boolean;
  message: string;
  socialLinks: (SocialLink & { position: number })[] | null;
}

export async function updateSocialLinks(
  data: UpdateSocialLinksProps
): Promise<UpdateSocialLinksResponse> {
  const { token, socialLinks } = data;

  if (!token) {
    return {
      success: false,
      message: "Token de autenticación requerido",
      socialLinks: null,
    };
  }

  if (!socialLinks || socialLinks.length === 0) {
    return {
      success: false,
      message: "No hay enlaces sociales para actualizar",
      socialLinks: null,
    };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/social-links`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          socialLinks: socialLinks.map((link, index) => ({
            name: link.name,
            url: link.url,
            enabled: link.enabled,
            position: link.position || index,
          })),
        }),
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

      if (response.status === 400) {
        const errorData = await response.json();
        return {
          success: false,
          message: errorData.message || "Datos inválidos enviados",
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
        message: "Error al actualizar los enlaces sociales",
        socialLinks: null,
      };
    }

    const data = await response.json();

    // Revalidar la caché después de una actualización exitosa
    revalidatePath("/admin");
    revalidatePath("/admin/links");

    revalidatePath(`/(publics)/[slug]`);

    return {
      success: true,
      message: "Enlaces sociales actualizados correctamente",
      socialLinks: data,
    };
  } catch (error) {
    console.error("Error updating social links:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      socialLinks: null,
    };
  }
}
