import { Payload } from 'src/modules/auth/models/payload.model';

declare module 'nestjs-cls' {
  interface ClsStore {
    payload: Payload;
  }
}
