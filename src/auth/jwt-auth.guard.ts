import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

/**
 * Custom AuthGuard that validates the JWT token.
 */
@Injectable()
export class JwtAuthGuard extends AuthGuard('jwt') {}