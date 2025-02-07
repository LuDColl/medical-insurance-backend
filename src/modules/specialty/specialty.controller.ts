import { Body, Controller, Get, Post } from '@nestjs/common';
import { SpecialtyService } from './specialty.service';
import { GetSpecialtyDto } from './dtos/get-specialty.dto';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostSpecialtyDto } from './dtos/post-specialty.dto';

@ApiBearerAuth()
@Controller('specialty')
export class SpecialtyController {
  constructor(private readonly service: SpecialtyService) {}

  @Get()
  async getAll(): Promise<GetSpecialtyDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostSpecialtyDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
