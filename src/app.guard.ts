import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { Payload } from './modules/auth/models/payload.model';
import { Reflector } from '@nestjs/core';
import { IS_PUBLIC_KEY } from './keys';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class AppGuard implements CanActivate {
  constructor(
    private readonly jwtService: JwtService,
    private readonly reflector: Reflector,
    private readonly clsService: ClsService,
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
      const payload = await this.jwtService.verifyAsync<Payload>(token);
      const { rules } = payload;
      const { url, method } = request;
      const rule = rules.find(({ path }) => url.includes(path));
      if (!rule) throw new ForbiddenException();

      if (rule.method && rule.method !== method) throw new ForbiddenException();

      this.clsService.set('payload', payload);
    } catch {
      throw new UnauthorizedException();
    }

    return true;
  }
}
