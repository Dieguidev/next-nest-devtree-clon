import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class GetUserBySlugUseCase {
  constructor(private readonly prisma: PrismaService) {}

  async execute(slug: string) {
    const user = await this.prisma.user.findUnique({
      where: { slug },
      select: {
        name: true,
        description: true,
        slug: true,
        email: true,
        image: true,
        isActive: true,
        socialLinks: {
          where: { enabled: true },
          orderBy: { position: 'asc' },
          select: {
            url: true,
            position: true,
            enabled: true,
            name: true,
          },
        },
      },
    });

    if (!user || !user.isActive) {
      throw new NotFoundException('User not found');
    }

    return user;
  }
}
