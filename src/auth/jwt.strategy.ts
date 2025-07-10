import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from the Authorization header
      ignoreExpiration: false, // Reject expired tokens
      secretOrKey: process.env.JWT_SECRET || 'default_secret', // Use the secret to validate the token
    });
  }

  /**
   * Validate the JWT payload.
   * @param payload - The decoded JWT payload.
   * @returns The user data to attach to the request.
   */
  async validate(payload: any) {
    return { userId: payload.sub, email: payload.email }; // Attach user data to request object
  }
}
