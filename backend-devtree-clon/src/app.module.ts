import { Module } from '@nestjs/common';
import { AuthModule } from './modules/auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { UsersModule } from './modules/users/users.module';
import { CloudinaryModule } from './cloudinary/cloudinary.module';
import { SocialLinksModule } from './modules/social-links/social-links.module';

@Module({
  imports: [
    AuthModule,
    PrismaModule,
    UsersModule,
    CloudinaryModule,
    SocialLinksModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
