import { Injectable } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async getAll(): Promise<GetUserDto[]> {
    const users = await this.usersRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetUserDto, users);
    return response;
  }
}
