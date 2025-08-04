"use server";

interface updateUserActionProps {
  token: string;
  handle: string;
  description: string;
}

export const updateUserAction = async (data: updateUserActionProps) => {
  const { description, token, handle } = data;
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          slug: handle,
          description: description,
        }),
      }
    );

    const data = await response.json();

    if (!response.ok) {
      if (response.status === 500) {
        return {
          success: false,
          message:
            "Error de comunicación con el servidor. Por favor, intenta más tarde.",
          user: null,
        };
      }
      if (response.status === 400 && data.message === "Slug already exists") {
        return {
          success: false,
          message: "Handle ya existe. Por favor, elige otro.",
          user: null,
        };
      }

      if (response.status === 400 && data.message === "No changes detected") {
        return {
          success: false,
          message: "No se detectaron cambios.",
          user: null,
        };
      }

      return {
        success: false,
        message:
          "Error al iniciar sesión. Por favor, verifica tus credenciales.",
        user: null,
      };
    }

    return {
      success: true,
      message: "Usuario actualizado correctamente.",
      user: data,
    };
  } catch (error) {
    console.log(error);

    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: null,
    };
  }
};
