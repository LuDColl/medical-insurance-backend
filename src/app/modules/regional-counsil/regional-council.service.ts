import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { RegionalCouncil } from './entities/regional-council.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetRegionalCouncilDto } from './dtos/get-regional-council.dto';
import { PostRegionalCouncilDto } from './dtos/post-regional-council.dto';
import { ClsService } from 'nestjs-cls';
import { PAYLOAD } from 'src/app/app.consts';

@Injectable()
export class RegionalCouncilService {
  constructor(
    @InjectRepository(RegionalCouncil)
    private readonly regionalCounsilRepository: Repository<RegionalCouncil>,

    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetRegionalCouncilDto[]> {
    const services = await this.regionalCounsilRepository.find({
      select: { id: true, acronym: true },
    });

    const response = plainToInstance(GetRegionalCouncilDto, services);
    return response;
  }

  async post({ acronym }: PostRegionalCouncilDto): Promise<number> {
    const payload = this.clsService.get(PAYLOAD);

    const service = this.regionalCounsilRepository.create({
      acronym,
      insertUserId: payload.id,
    });

    const { id } = await this.regionalCounsilRepository.save(service);
    return id;
  }
}
