import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { SocialLinksController } from './social-links.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateOrUpdateSocialLinksUseCase } from './use-cases/create-or-update.use-case';
import { GetSocialLinksByUserUseCase } from './use-cases/get-socialLinks -by-user.use-case';
import { GetUserBySlugUseCase } from '../users/use-cases/get-by-slug.use-case';

@Module({
  controllers: [SocialLinksController],
  providers: [
    SocialLinksService,
    CreateOrUpdateSocialLinksUseCase,
    GetSocialLinksByUserUseCase,
    GetUserBySlugUseCase,
  ],
  imports: [PrismaModule],
})
export class SocialLinksModule {}
