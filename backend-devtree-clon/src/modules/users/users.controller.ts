import {
  Controller,
  Get,
  Body,
  Patch,
  Param,
  Delete,
  Post,
  UploadedFile,
  UseInterceptors,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dto/update-user.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import { GetUser } from '../auth/decorators/get-user.decorator';
import { User } from '../auth/entities/user.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(+id);
  }

  @Patch()
  @Auth()
  update(@GetUser() user: User, @Body() updateUserDto: UpdateUserDto) {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Post('upload-image')
  @Auth()
  @UseInterceptors(FileInterceptor('image'))
  uploadImage(
    @GetUser() user: User,
    @UploadedFile() file: { buffer: Buffer; mimetype: string },
  ) {
    if (!file) {
      throw new BadRequestException('No file uploaded');
    }

    return this.usersService.uploadImage(user.id, file.buffer, file.mimetype);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.usersService.remove(id);
  }
}
