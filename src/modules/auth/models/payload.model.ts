import { Exclude, Expose } from 'class-transformer';

export class Payload {
  id: number;
  name: string;
  rules: PayloadRule[];
  iat?: number;
  exp?: number;
}

@Exclude()
export class PayloadRule {
  @Expose() id: number;
  @Expose() path: string;
  @Expose() method?: string;
}
