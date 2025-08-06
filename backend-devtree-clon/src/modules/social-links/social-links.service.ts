import { Injectable } from '@nestjs/common';
import { CreateSocialLinkDto } from './dto/create-social-link.dto';
import { CreateOrUpdateSocialLinksUseCase } from './use-cases/create-or-update.use-case';
import { GetSocialLinksByUserUseCase } from './use-cases/get-socialLinks -by-user.use-case';
import { GetUserBySlugUseCase } from '../users/use-cases/get-by-slug.use-case';

@Injectable()
export class SocialLinksService {
  constructor(
    private readonly createOrUpdateSocialLinksUseCase: CreateOrUpdateSocialLinksUseCase,
    private readonly getSocialLinksByUserUseCase: GetSocialLinksByUserUseCase,
    private readonly getUserBySlugUseCase: GetUserBySlugUseCase,
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

  findOne(slug: string) {
    return this.getUserBySlugUseCase.execute(slug);
  }

  remove(id: number) {
    return `This action removes a #${id} socialLink`;
  }
}
