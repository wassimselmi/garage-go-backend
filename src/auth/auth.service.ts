import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import * as bcrypt from 'bcrypt';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findByEmail(email);
    if (user && user.isActive && (await bcrypt.compare(password, user.password))) {
      const { password, ...result } = user.toObject();
      return result;
    }
    throw new UnauthorizedException('Invalid email or password or account is inactive');
  }

  async login(user: any): Promise<{ accessToken: string; user: any }> {
    const payload = { 
      email: user.email, 
      sub: user._id, 
      role: user.role 
    };
    return {
      accessToken: this.jwtService.sign(payload),
      user: user,
    };
  }

  // Added registration method
  async register(createUserDto: CreateUserDto): Promise<{ accessToken: string; user: any }> {
    const user = await this.usersService.create(createUserDto);
    return this.login(user);
  }
}