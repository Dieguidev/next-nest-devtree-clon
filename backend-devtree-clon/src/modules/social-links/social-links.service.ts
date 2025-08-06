import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { CreateOrUpdateSocialLinksUseCase } from './use-cases/create-or-update.use-case';
import { GetSocialLinksByUserUseCase } from './use-cases/get-socialLinks -by-user.use-case';

@Injectable()
export class SocialLinksService {
  constructor(
    private readonly createOrUpdateSocialLinksUseCase: CreateOrUpdateSocialLinksUseCase,
    private readonly getSocialLinksByUserUseCase: GetSocialLinksByUserUseCase,
  ) {}

  createOrUpdate(userId: string, createSocialLinkDto: CreateSocialLinkDto) {
    return this.createOrUpdateSocialLinksUseCase.execute(
      userId,
      createSocialLinkDto,
    );
  }

  getByUser(userId: string) {
    return this.getSocialLinksByUserUseCase.execute(userId);
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
