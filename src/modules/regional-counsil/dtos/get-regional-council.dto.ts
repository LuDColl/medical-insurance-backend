import { Exclude, Expose } from 'class-transformer';

@Exclude()
export class GetRegionalCouncilDto {
  @Expose() id: number;
  @Expose() acronym: string;
}
