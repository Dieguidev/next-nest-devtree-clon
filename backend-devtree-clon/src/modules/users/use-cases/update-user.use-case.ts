import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  Logger,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UpdateUserDto } from '../dto/update-user.dto';
import { generateSlug } from 'src/utils/generateSlug';

@Injectable()
export class UpdateUserUseCase {
  private readonly logger = new Logger('UpdateUserUseCase');

  constructor(private readonly prisma: PrismaService) {}

  async execute(updateUserDto: UpdateUserDto, userId: string) {
    try {
      const { description, slug } = updateUserDto;

      const existingUser = await this.prisma.user.findUnique({
        where: { id: userId },
        select: {
          description: true,
          slug: true,
        },
      });

      if (
        existingUser?.description === description &&
        existingUser?.slug === slug
      ) {
        throw new BadRequestException('No changes detected');
      }

      const user = await this.prisma.user.update({
        where: { id: userId },
        data: {
          description: description.trim(),
          slug: generateSlug(slug),
        },
      });

      const { password: _, ...userWithoutPassword } = user;
      void _;

      return {
        ...userWithoutPassword,
      };
    } catch (error) {
      // if (error instanceof BadRequestException) {
      //   throw error; // Propagar BadRequestException directamente
      // }
      this.handlerDBExceptions(error);
    }
  }

  private handlerDBExceptions(error: any): never {
    if (error.code === 'P2002') {
      // Prisma unique constraint error
      const target = error.meta?.target;

      if (target?.includes('slug')) {
        throw new BadRequestException('Slug already exists');
      }

      throw new BadRequestException('Unique constraint violation');
    }

    this.logger.error(error);

    if (error instanceof BadRequestException) {
      throw error; // Asegurarse de que BadRequestException se propague correctamente
    }

    throw new InternalServerErrorException('Something went wrong');
  }
}
