import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UploadUserImageUseCase } from './use-cases/upload-user-image.use-case';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UpdateUserUseCase, UploadUserImageUseCase],
  imports: [PrismaModule, CloudinaryModule],
})
export class UsersModule {}
