import { Body, Controller, Post } from '@nestjs/common';
import { PostLogin } from './dtos/post-login.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/decorators/public.decorator';

@Public()
@Controller('auth')
export class AuthController {
  constructor(private readonly service: AuthService) {}
  @Post('login')
  async login(@Body() body: PostLogin): Promise<string> {
    const response = await this.service.login(body);
    return response;
  }
}
