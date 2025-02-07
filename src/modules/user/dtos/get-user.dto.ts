import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetUserDto {
  @Expose() id: number;
  @Expose() name: string;
}
