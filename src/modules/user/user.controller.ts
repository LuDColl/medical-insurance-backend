import { Controller, Get } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  async getAll(): Promise<GetUserDto[]> {
    const response = await this.service.getAll();
    return response;
  }
}
