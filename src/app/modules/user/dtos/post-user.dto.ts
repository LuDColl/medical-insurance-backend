import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateNested } from 'class-validator';

export class PostUserRuleBodyDto {
  @IsString()
  @ApiProperty()
  path: string;

  @IsString()
  @IsOptional()
  @ApiPropertyOptional()
  method?: string;
}

export class PostUserBodyDto {
  @IsString()
  @ApiProperty()
  name: string;

  @IsString()
  @ApiProperty()
  password: string;

  @ValidateNested()
  @ApiProperty({ type: PostUserRuleBodyDto, isArray: true })
  rules: PostUserRuleBodyDto[];
}
