import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { UpdateUserUseCase } from './use-cases/update-user.use-case';

@Module({
  controllers: [UsersController],
  providers: [UsersService, UpdateUserUseCase],
  imports: [PrismaModule],
})
export class UsersModule {}
