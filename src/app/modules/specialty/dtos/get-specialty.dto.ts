import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetSpecialtyDto {
  @Expose() id: number;
  @Expose() name: string;
}
