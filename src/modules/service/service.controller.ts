import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetServiceDto } from './dtos/get-service.dto';
import { ServiceService } from './service.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostServiceDto } from './dtos/post-service.dto';

@Controller('service')
@ApiBearerAuth()
export class ServiceController {
  constructor(private readonly service: ServiceService) {}

  @Get()
  async getAll(): Promise<GetServiceDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostServiceDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
