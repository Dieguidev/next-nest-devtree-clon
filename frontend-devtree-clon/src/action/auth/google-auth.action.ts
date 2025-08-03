"use server";

export const googleAuthAction = async () => {
  try {
    // Redirigir al endpoint de Google OAuth en el backend
    const backendUrl =
      process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000";
    const googleAuthUrl = `${backendUrl}/api/auth/google`;

    return {
      success: true,
      redirectUrl: googleAuthUrl,
    };
  } catch (error) {
    console.error("Google auth failed:", error);
    return {
      success: false,
      message: "Error al iniciar autenticación con Google.",
    };
  }
};
