"use server";

interface UploadImageActionProps {
  token: string;
  file: File;
}

export const uploadImageAction = async (data: UploadImageActionProps) => {
  const { token, file } = data;

  try {
    const formData = new FormData();
    formData.append("image", file);

    const response = await fetch(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/upload-image`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    const result = await response.json();

    if (!response.ok) {
      return {
        success: false,
        error: result.message || "Error uploading image",
      };
    }

    return {
      success: true,
      data: result,
    };
  } catch (error) {
    console.error("Upload image error:", error);
    return {
      success: false,
      error: "Something went wrong",
    };
  }
};
