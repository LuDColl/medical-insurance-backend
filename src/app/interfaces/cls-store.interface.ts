import { Payload } from 'src/app/modules/auth/models/payload.model';

declare module 'nestjs-cls' {
  interface ClsStore {
    payload: Payload;
  }
}
