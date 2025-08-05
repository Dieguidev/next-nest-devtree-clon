import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { CreateOrUpdateSocialLinksUseCase } from './use-cases/create-or-update.use-case';

@Injectable()
export class SocialLinksService {
  constructor(
    private readonly createOrUpdateSocialLinksUseCase: CreateOrUpdateSocialLinksUseCase,
  ) {}
  createOrUpdate(userId: string, createSocialLinkDto: CreateSocialLinkDto) {
    return this.createOrUpdateSocialLinksUseCase.execute(
      userId,
      createSocialLinkDto,
    );
  }

  findAll() {
    return `This action returns all socialLinks`;
  }

  findOne(id: number) {
    return `This action returns a #${id} socialLink`;
  }

  remove(id: number) {
    return `This action removes a #${id} socialLink`;
  }
}
