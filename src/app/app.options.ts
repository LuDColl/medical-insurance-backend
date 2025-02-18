import { TypeOrmModuleAsyncOptions } from '@nestjs/typeorm';
import { JwtModuleOptions } from '@nestjs/jwt';
import { ClsModuleOptions } from 'nestjs-cls';
import { EXPIRES_IN } from './app.consts';

export const jwtModuleOptions: JwtModuleOptions = {
  global: true,
  secret: process.env.JWT_SECRET,
  signOptions: { expiresIn: EXPIRES_IN },
};

export const clsModuleOptions: ClsModuleOptions = {
  global: true,
  middleware: { mount: true },
};
