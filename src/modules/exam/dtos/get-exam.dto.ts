import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetExamDto {
  @Expose() id: number;
  @Expose() name: string;
}
