import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CloudinaryModule } from 'src/cloudinary/cloudinary.module';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UploadUserImageUseCase } from './use-cases/upload-user-image.use-case';
import { GetUserBySlugUseCase } from './use-cases/get-by-slug.use-case';
import { VerifySlugAvailableUseCase } from './use-cases/verify-slug-available.use-case';

@Module({
  controllers: [UsersController],
  providers: [
    UsersService,
    UpdateUserUseCase,
    UploadUserImageUseCase,
    GetUserBySlugUseCase,
    VerifySlugAvailableUseCase,
  ],
  imports: [PrismaModule, CloudinaryModule],
})
export class UsersModule {}
