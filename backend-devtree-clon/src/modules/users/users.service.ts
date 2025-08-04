import { Injectable } from '@nestjs/common';

import { UpdateUserDto } from './dto/update-user.dto';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Injectable()
export class UsersService {
  constructor(private readonly updateUserUseCase: UpdateUserUseCase) {}
  findAll() {
    return `This action returns all users`;
  }

  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.updateUserUseCase.execute(updateUserDto, id);
  }

  remove(id: string) {
    return `This action removes a #${id} user`;
  }
}
