import {
  IsArray,
  IsBoolean,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsUrl,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateSocialLinkDto {
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => SocialLink)
  socialLinks: SocialLink[];
}

class SocialLink {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  @IsNotEmpty()
  url: string;

  @IsInt()
  @IsOptional()
  position?: number;

  @IsBoolean()
  enabled: boolean;
}
