import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { ArrayUnique, IsInt, IsOptional, IsString } from 'class-validator';

export class PostExamDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsOptional()
  @ArrayUnique()
  @IsInt({ each: true })
  @ApiPropertyOptional({ type: Number, isArray: true })
  specialtyIds: number[];

  @IsInt()
  @IsOptional()
  @ApiPropertyOptional()
  parentId: number;
}
