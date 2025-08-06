'use client'

interface ActiveSocialLinksProps {
  link: {
    name: string;
    url: string;
    enabled: boolean;
  } & {
    position?: number | undefined;
  }
}

export const ActiveSocialLinks = ({ link }: ActiveSocialLinksProps) => {

  return (
    <div
      className="bg-white px-5 py-2 flex items-center gap-5 rounded-lg"
    >
      <div
        className="w-12 h-12 bg-cover"
        style={{
          backgroundImage: `url('/social/icon_${link.name}.svg')`
        }}
      ></div>
      <p className="capitalize">
        Visita mi: <span className="font-bold">{link.name}</span>
      </p>

    </div>
  )
}