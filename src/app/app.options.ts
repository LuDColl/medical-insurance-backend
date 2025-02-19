import { ClsModuleOptions } from 'nestjs-cls';

export const clsModuleOptions: ClsModuleOptions = {
  global: true,
  middleware: { mount: true },
};
