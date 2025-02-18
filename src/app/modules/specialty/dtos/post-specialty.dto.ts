import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostSpecialtyDto {
  @IsString()
  @ApiProperty()
  name: string;
}
