import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module'; // Import UsersModule
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './jwt.strategy';

@Module({
  imports: [
    UsersModule, // Import UsersModule to access users
    PassportModule, // Passport for authentication strategies
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'default_secret', // JWT secret key
      signOptions: { expiresIn: '1h' }, // Token expiration
    }),
  ],
  controllers: [AuthController], // Add AuthController
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy
})
export class AuthModule {}
