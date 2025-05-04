import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService, // Inject UsersService to access user-related logic
    private readonly jwtService: JwtService, // Inject JwtService to generate and verify tokens
  ) {}

  /**
   * Validate user credentials.
   * @param email - The user's email address.
   * @param password - The user's raw (unhashed) password.
   * @returns The user object if valid, otherwise throws UnauthorizedException.
   */
  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      // Exclude sensitive fields like password from the returned object
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid email or password');
  }

  /**
   * Generate a JWT for the authenticated user.
   * @param user - The user object (excluding sensitive fields like password).
   * @returns The access token.
   */
  async login(user: any): Promise<{ accessToken: string }> {
    const payload = { email: user.email, sub: user._id }; // Set token payload
    return {
      accessToken: this.jwtService.sign(payload), // Generate JWT
    };
  }
}