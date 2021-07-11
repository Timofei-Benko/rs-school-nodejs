import { CanActivate, ExecutionContext, UnauthorizedException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(private jwtService: JwtService) {}
  canActivate(
    context: ExecutionContext,
  ) {
    const req = context.switchToHttp().getRequest();
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException({
        message: 'Authentication error',
      });
    }
    const [ type, token ] = authHeader.split(' ');
    if (type !== 'Bearer') {
      throw new UnauthorizedException({
        message: 'Authentication error',
      });
    }
    if (!token) {
      throw new UnauthorizedException({
        message: 'Authentication error',
      });
    }
    try {
      req.user = this.jwtService.verify(token);
      return true;
    } catch (e) {
      throw new UnauthorizedException({ message: 'Not authorized' });
    }
  }
}
