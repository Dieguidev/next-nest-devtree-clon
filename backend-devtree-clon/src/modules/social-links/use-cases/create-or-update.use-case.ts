import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateSocialLinkDto } from '../dto/create-social-link.dto';

@Injectable()
export class CreateOrUpdateSocialLinksUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string, dto: CreateSocialLinkDto) {
    const { socialLinks } = dto;

    // Validar que no haya duplicados en los nombres de los enlaces
    const uniqueNames = new Set(socialLinks.map((link) => link.name));
    if (uniqueNames.size !== socialLinks.length) {
      throw new Error('Duplicate social link names are not allowed.');
    }

    // Crear o actualizar los enlaces sociales
    const operations = socialLinks.map((link) =>
      this.prisma.socialLink.upsert({
        where: {
          userId_name: {
            userId,
            name: link.name,
          },
        },
        update: {
          url: link.url,
          position: link.position,
          enabled: link.enabled,
        },
        create: {
          userId,
          name: link.name,
          url: '',
          position: link.position,
          enabled: link.enabled,
        },
      }),
    );

    await Promise.all(operations);

    // Retornar los enlaces actualizados
    return this.prisma.socialLink.findMany({
      where: { userId },
      orderBy: { position: 'asc' },
    });
  }
}
