import { notFound } from "next/navigation";

export const getUserBySlug = async (slug: string) => {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/users/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (!res.ok) {
    notFound();
  }

  return res.json();
};
