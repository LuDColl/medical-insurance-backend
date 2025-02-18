import { BadRequestException, Injectable } from '@nestjs/common';
import { GetUserDto } from './dtos/get-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { PostUserBodyDto } from './dtos/post-user.dto';
import { hash } from 'bcrypt';
import { UserRule } from './entities/user-rule.entity';
import { ClsService } from 'nestjs-cls';
import { PAYLOAD } from 'src/app/app.consts';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,

    @InjectRepository(UserRule)
    private readonly userRuleRepository: Repository<UserRule>,

    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetUserDto[]> {
    const users = await this.userRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetUserDto, users);
    return response;
  }

  async post({ password, name, rules }: PostUserBodyDto): Promise<number> {
    const userExists = await this.userRepository.exists({ where: { name } });
    if (userExists) throw new BadRequestException('User already exists');

    const passwordHash = await hash(password, 12);
    const payload = this.clsService.get(PAYLOAD);

    const toUserRules = rules.map(({ path, method }) => ({
      path,
      method,
      insertUserId: payload.id,
    }));

    const userRules = this.userRuleRepository.create(toUserRules);

    const user = this.userRepository.create({
      name: name,
      hash: passwordHash,
      userRules,
    });

    const { id } = await this.userRepository.save(user);
    return id;
  }
}
