import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetProcedureDto {
  @Expose() id: number;
  @Expose() name: string;
}
