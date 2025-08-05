import { Module } from '@nestjs/common';
import { SocialLinksService } from './social-links.service';
import { SocialLinksController } from './social-links.controller';
import { PrismaModule } from 'src/prisma/prisma.module';
import { CreateOrUpdateSocialLinksUseCase } from './use-cases/create-or-update.use-case';

@Module({
  controllers: [SocialLinksController],
  providers: [SocialLinksService, CreateOrUpdateSocialLinksUseCase],
  imports: [PrismaModule],
})
export class SocialLinksModule {}
