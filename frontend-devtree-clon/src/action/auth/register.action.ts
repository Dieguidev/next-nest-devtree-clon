"use server";

interface RegisterActionProps {
  name: string;
  email: string;
  password: string;
  handle: string;
}

export const registerAction = async (formData: RegisterActionProps) => {
  try {
    const response = await fetch("http://localhost:3000/api/auth/register", {
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
    });

    console.log(response);

    if (!response.ok) {
      throw new Error("Registration failed");
    }

    const data = await response.json();
    console.log({ data });

    return data;
  } catch (error) {
    console.error("Registration failed:", error);
    throw new Error("Registration failed. Please try again later.");
  }
};
