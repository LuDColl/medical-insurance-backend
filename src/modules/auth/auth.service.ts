import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { PostLoginBody } from './dtos/post-login.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from '../user/entities/user.entity';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { Payload, PayloadRule } from './models/payload.model';
import { compare } from 'bcrypt';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ name, password }: PostLoginBody): Promise<string> {
    const user = await this.usersRepository.findOne({
      select: {
        id: true,
        hash: true,
        userRules: { id: true, path: true, method: true },
      },
      relations: { userRules: true },
      where: { name },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');

    const { hash, userRules } = user;
    const isMatch = await compare(password, hash);
    if (!isMatch) throw new UnauthorizedException('Senha incorreta');

    const rules = plainToInstance(PayloadRule, userRules);
    const payload: Payload = { id: user.id, name: name, rules };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
