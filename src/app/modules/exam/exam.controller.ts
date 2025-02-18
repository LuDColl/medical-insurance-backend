import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetExamDto } from './dtos/get-exam.dto';
import { ExamService } from './exam.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostExamDto } from './dtos/post-exam.dto';

@ApiBearerAuth()
@Controller('exam')
export class ExamController {
  constructor(private readonly service: ExamService) {}

  @Get()
  async getAll(): Promise<GetExamDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostExamDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
