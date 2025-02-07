import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class PostServiceDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  specialtyId: number;

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  parentId: number;
}
