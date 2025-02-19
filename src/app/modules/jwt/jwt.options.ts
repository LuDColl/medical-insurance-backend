import { JwtModuleAsyncOptions } from '@nestjs/jwt';
import { useFactory } from './jwt.functions';

export const jwtModuleAsyncOptions: JwtModuleAsyncOptions = {
  global: true,
  useFactory: useFactory,
};
