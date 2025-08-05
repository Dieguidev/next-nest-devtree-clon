import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetSocialLinksByUserUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(userId: string) {
    // Validar que el userId no esté vacío
    if (!userId) {
      throw new NotFoundException('User ID is required');
    }

    // Obtener los enlaces sociales del usuario
    const socialLinks = await this.prisma.socialLink.findMany({
      where: { userId },
      orderBy: { position: 'asc' },
    });

    // Validar si no se encontraron enlaces
    if (!socialLinks || socialLinks.length === 0) {
      return [];
    }

    return socialLinks;
  }
}
