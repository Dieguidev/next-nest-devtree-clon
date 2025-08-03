"use server";

interface RegisterActionProps {
  name: string;
  email: string;
  password: string;
  handle: string;
}

export const registerAction = async (formData: RegisterActionProps) => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/auth/register`,
      {
        method: "POST",
        body: JSON.stringify({
          name: formData.name,
          email: formData.email,
          password: formData.password,
          slug: formData.handle,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const errorMessages: Record<string, string> = {
        "Email already exists": "El correo electrónico ya está registrado.",
        "Slug already exists": "El handle de usuario ya está en uso.",
      };

      const errorMessage = Object.keys(errorMessages).find((key) =>
        data.message.includes(key)
      );

      return {
        success: false,
        message: errorMessage
          ? errorMessages[errorMessage]
          : "Error en los datos proporcionados. Por favor, verifica e intenta nuevamente.",
        user: {},
      };
    }

    return {
      success: true,
      message: "Registro exitoso.",
      user: data.user,
    };
  } catch (error) {
    console.error("Registration failed:", error);
    return {
      success: false,
      message: "Error inesperado. Por favor, intenta más tarde.",
      user: {},
    };
  }
};
