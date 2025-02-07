import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetServiceDto {
  @Expose() id: number;
  @Expose() name: string;
}
