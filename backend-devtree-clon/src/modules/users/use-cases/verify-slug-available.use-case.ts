import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class VerifySlugAvailableUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(slug: string) {
    // Lógica para verificar si el slug está disponible
    const existingUser = await this.prisma.user.findUnique({
      where: { slug },
      select: { slug: true },
    });
    if (existingUser) {
      return {
        available: false,
        message: 'This slug is already taken',
      };
    }
    return {
      available: true,
      message: 'This slug is available',
    };
  }
}
