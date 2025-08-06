import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';
import { UploadUserImageUseCase } from './use-cases/upload-user-image.use-case';
import { GetUserBySlugUseCase } from './use-cases/get-by-slug.use-case';

@Injectable()
export class UsersService {
  constructor(
    private readonly updateUserUseCase: UpdateUserUseCase,
    private readonly uploadUserImageUseCase: UploadUserImageUseCase,
    private readonly getUserBySlugUseCase: GetUserBySlugUseCase,
  ) {}
  findAll() {
    return `This action returns all users`;
  }

  findOne(slug: string) {
    return this.getUserBySlugUseCase.execute(slug);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(updateUserDto, id);
  }

  uploadImage(userId: string, fileBuffer: Buffer, fileMimeType: string) {
    return this.uploadUserImageUseCase.execute(
      userId,
      fileBuffer,
      fileMimeType,
    );
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
