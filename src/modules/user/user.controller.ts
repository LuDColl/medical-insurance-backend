import { Body, Controller, Get, Post } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { UserService } from './user.service';
import { ApiBearerAuth } from '@nestjs/swagger';
import { PostUserBodyDto } from './dtos/post-user.dto';

@ApiBearerAuth()
@Controller('user')
export class UserController {
  constructor(private readonly service: UserService) {}
  @Get()
  async getAll(): Promise<GetUserDto[]> {
    const response = await this.service.getAll();
    return response;
  }

  @Post()
  async post(@Body() body: PostUserBodyDto): Promise<number> {
    const response = await this.service.post(body);
    return response;
  }
}
