import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UsersService } from '../users/users.service';
import { LoginUserDto } from './dto/login-user.dto';

//test

@Controller('auth')
export class AuthController {
  constructor(
    private readonly authService: AuthService, // Inject AuthService for authentication logic
    private readonly usersService: UsersService, // Inject UsersService to access user-related logic
  ) {}

  /**
   * Handle user login.
   * @param loginUserDto - DTO containing email and password.
   * @returns The access token if login is successful.
   */
  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto): Promise<{ accessToken: string }> {
    // Validate the user's credentials
    const user = await this.authService.validateUser(
      loginUserDto.email,
      loginUserDto.password,
    );

    // If valid, generate a JWT token
    return this.authService.login(user);
  }
}