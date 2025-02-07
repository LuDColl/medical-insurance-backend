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
import { Payload } from './models/payload.model';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async login({ name, password }: PostLoginBody): Promise<string> {
    const user = await this.usersRepository.findOne({
      select: { id: true, hash: true },
      where: { name },
    });

    if (!user) throw new NotFoundException('Usuário não encontrado');
    const { hash } = user;
    const isMatch = await compare(password, hash);
    if (!isMatch) throw new UnauthorizedException('Senha incorreta');
    const payload: Payload = { id: user.id, name: name };
    const token = await this.jwtService.signAsync(payload);
    return token;
  }
}
