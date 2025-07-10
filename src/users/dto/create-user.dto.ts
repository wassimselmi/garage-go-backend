import {
  IsEmail,
  IsString,
  IsEnum,
  IsObject,
  ValidateNested,
  IsOptional,
} from 'class-validator';
import { Type } from 'class-transformer';

export class ProfileDto {
  @IsString()
  name: string;

  @IsString()
  phone: string;

  @IsOptional() // Add this
  @IsString()
  avatar?: string; // Optional avatar URL
}

export class CreateUserDto {
  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(['car_owner', 'garage_owner'])
  role: string;

  @IsObject()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto;
}
