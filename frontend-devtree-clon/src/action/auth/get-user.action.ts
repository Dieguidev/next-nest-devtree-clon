"use server";

export const getUser = async (token: string) => {
  try {
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_BACKEND_URL || "http://localhost:3000"
      }/api/auth/profile`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      }
    );

    if (!response.ok) {
      const errorText = await response.text();

      throw new Error(`HTTP ${response.status}: ${errorText}`);
    }

    const user = await response.json();

    return user;
  } catch (error) {
    return { error: error instanceof Error ? error.message : "Unknown error" };
  }
};
