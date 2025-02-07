import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './modules/auth/models/payload.model';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './keys';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private jwtService: JwtService,
    private reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const handler = context.getHandler();
    const classType = context.getClass();

    const isPublic = this.reflector.getAllAndOverride<boolean>(IS_PUBLIC_KEY, [
      handler,
      classType,
    ]);

    if (isPublic) return true;

    const http = context.switchToHttp();
    const request: Request = http.getRequest();
    const { authorization } = request.headers;
    if (!authorization) throw new UnauthorizedException();

    const splitedAuthorization = authorization.split(' ');
    const [, token] = splitedAuthorization;
    if (!token) throw new UnauthorizedException();

    try {
      await this.jwtService.verifyAsync<Payload>(token);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
