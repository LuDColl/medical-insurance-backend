import { APP_GUARD } from '@nestjs/core';
import { AppGuard } from './app.guard';
import { Provider } from '@nestjs/common';

export const AppGuardProvider: Provider = {
  provide: APP_GUARD,
  useClass: AppGuard,
};
