import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Specialty } from './entities/specialty.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetSpecialtyDto } from './dtos/get-specialty.dto';
import { PostSpecialtyDto } from './dtos/post-specialty.dto';
import { ClsService } from 'nestjs-cls';
import { PAYLOAD } from 'src/app/app.consts';

@Injectable()
export class SpecialtyService {
  constructor(
    @InjectRepository(Specialty)
    private readonly specialtyRepository: Repository<Specialty>,

    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetSpecialtyDto[]> {
    const specialties = await this.specialtyRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetSpecialtyDto, specialties);
    return response;
  }

  async post({ name }: PostSpecialtyDto): Promise<number> {
    const payload = this.clsService.get(PAYLOAD);

    const specialty = this.specialtyRepository.create({
      name,
      insertUserId: payload.id,
    });

    const { id } = await this.specialtyRepository.save(specialty);
    return id;
  }
}
