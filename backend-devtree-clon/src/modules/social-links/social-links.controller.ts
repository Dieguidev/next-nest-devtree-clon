import { Controller, Get, Post, Body, Param, Delete } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';

import { GetUser } from '../auth/decorators/get-user.decorator';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { Auth } from '../auth/decorators/auth.decorator';
import type { User } from '../auth/entities/user.entity';

@Controller('social-links')
export class SocialLinksController {
  constructor(private readonly socialLinksService: SocialLinksService) {}

  @Post()
  @Auth()
  create(
    @Body() createSocialLinkDto: CreateSocialLinkDto,
    @GetUser() user: User,
  ) {
    return this.socialLinksService.createOrUpdate(user.id, createSocialLinkDto);
  }

  @Get()
  @Auth()
  getByUser(@GetUser() user: User) {
    return this.socialLinksService.getByUser(user.id);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.socialLinksService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.socialLinksService.remove(+id);
  }
}
