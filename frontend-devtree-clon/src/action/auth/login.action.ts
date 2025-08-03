"use server";

interface LoginActionProps {
  email: string;
  password: string;
}

export const loginAction = async (formData: LoginActionProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/login`,
      {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
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

      return {
        success: false,
        message:
          data.message ||
          "Error al iniciar sesión. Por favor, verifica tus credenciales.",
        user: null,
      };
    }

    return {
      success: true,
      message: "Inicio de sesión exitoso.",
      user: data,
    };
  } catch (error) {
    console.error("Login failed:", error);

    // Manejo de errores de red
    if (error instanceof TypeError && error.message === "Failed to fetch") {
      return {
        success: false,
        message:
          "No se pudo conectar con el servidor. Por favor, verifica tu conexión.",
        user: null,
      };
    }

    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: null,
    };
  }
};
