import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetProcedureDto } from './dtos/get-procedure.dto';
import { ProcedureService } from './procedure.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostProcedureDto } from './dtos/post-procedure.dto';

@ApiBearerAuth()
@Controller('procedure')
export class ProcedureController {
  constructor(private readonly service: ProcedureService) {}

  @Get()
  async getAll(): Promise<GetProcedureDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostProcedureDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
