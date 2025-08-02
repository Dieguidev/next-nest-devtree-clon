import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { CreateUserUseCase, LoginUserUseCase } from './use-cases';

@Injectable()
export class AuthService {
  constructor(
    private readonly createUserUseCase: CreateUserUseCase,
    private readonly loginUserUseCase: LoginUserUseCase,
  ) {}

  async create(createUserDto: CreateUserDto) {
    return this.createUserUseCase.execute(createUserDto);
  }

  async login(loginUserDto: LoginUserDto) {
    return this.loginUserUseCase.execute(loginUserDto);
  }
}
