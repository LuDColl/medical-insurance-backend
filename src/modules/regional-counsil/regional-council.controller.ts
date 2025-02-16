import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetRegionalCouncilDto } from './dtos/get-regional-council.dto';
import { RegionalCouncilService } from './regional-council.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostRegionalCouncilDto } from './dtos/post-regional-council.dto';

@ApiBearerAuth()
@Controller('regional-council')
export class RegionalCouncilController {
  constructor(private readonly service: RegionalCouncilService) {}

  @Get()
  async getAll(): Promise<GetRegionalCouncilDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostRegionalCouncilDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
