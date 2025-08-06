import { getUserBySlug } from "@/action";
import { ResponseGetUserBySlug } from "@/interfaces/res-get-by-slug";
import Image from "next/image";
import Link from "next/link";

interface ViewProfilePageProps {
  params: Promise<{ slug: string }>
}
export default async function ViewProfilePage({ params }: ViewProfilePageProps) {
  const { slug } = await params;

  const user: ResponseGetUserBySlug = await getUserBySlug(slug);

  const { description, image, name, socialLinks } = user



  return (
    <div className="space-y-6 text-white">
      <p className="text-5xl text-center font-black">{name}</p>

      {image && (
        <Image
          src={image}
          alt={name}
          width={250}
          height={250}
          className="max-w-[250px] mx-auto"
        />
      )}

      <p className="text-lg text-center font-bold">{description}</p>

      <div className="mt-20 flex flex-col gap-6">
        {socialLinks.length ?
          socialLinks.map(link => (
            <Link
              key={link.name}
              className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
              href={link.url}
              target="_blank"
              rel="noreferrer noopener"
            >
              <Image
                src={`/social/icon_${link.name}.svg`}
                alt="imagen red social"
                width={48}
                height={48}
                className="w-12"
              />
              <p className="text-black capitalize font-bold text-lg">
                Visita mi: {link.name}
              </p>
            </Link>
          ))
          :
          <p className="text-center">No hay enlaces en este perfil</p>}
      </div>
    </div>
  );
}