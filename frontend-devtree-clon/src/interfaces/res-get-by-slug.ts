export interface ResponseGetUserBySlug {
  name: string;
  description: string;
  slug: string;
  email: string;
  image: string;
  isActive: boolean;
  socialLinks: SocialLink[];
}

export interface SocialLink {
  url: string;
  position: number;
  enabled: boolean;
  name: string;
}
