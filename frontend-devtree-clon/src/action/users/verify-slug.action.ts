"use server";

interface VerifySlugResponse {
  available: boolean;
  message: string;
}

export const verifySlugAction = async (
  slug: string
): Promise<VerifySlugResponse> => {
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/verify-slug`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ slug }),
      }
    );

    if (!response.ok) {
      if (response.status === 500) {
        return {
          available: false,
          message:
            "Error de comunicación con el servidor. Por favor, intenta más tarde.",
        };
      }
    }

    const data = await response.json();
    console.log(data);

    return {
      available: data.available,
      message: data.message,
    };
  } catch (error) {
    console.error("Error verifying slug:", error);
    return {
      available: false,
      message: "Error verifying slug",
    };
  }
};
