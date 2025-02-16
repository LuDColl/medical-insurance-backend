import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostRegionalCouncilDto {
  @IsString()
  @ApiProperty()
  acronym: string;
}
