import { IsEmail, IsString, IsEnum, IsObject, ValidateNested } from 'class-validator';
import { Type } from 'class-transformer';


//The DTO (Data Transfer Object) is responsible for validating and transforming incoming data.
//  It ensures that the data provided in HTTP requests is structured correctly before it reaches your service.

export class ProfileDto {
  @IsString()
  name: string; // User's name

  @IsString()
  phone: string; // User's phone

  @IsString()
  avatar?: string; // Optional avatar URL
}

export class CreateUserDto {
  @IsEmail()
  email: string; // User's email address

  @IsString()
  password: string; // User's password

  @IsEnum(['car_owner', 'garage_owner'])
  role: string; // User's role

  @IsObject()
  @ValidateNested()
  @Type(() => ProfileDto)
  profile: ProfileDto; // Embedded profile object
}