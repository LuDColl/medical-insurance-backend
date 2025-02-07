import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Service } from './entities/service.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetServiceDto } from './dtos/get-service.dto';
import { PostServiceDto } from './dtos/post-service.dto';
import { ClsService } from 'nestjs-cls';

@Injectable()
export class ServiceService {
  constructor(
    @InjectRepository(Service)
    private readonly serviceRepository: Repository<Service>,
    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetServiceDto[]> {
    const services = await this.serviceRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetServiceDto, services);
    return response;
  }

  async post({ name, parentId, specialtyId }: PostServiceDto): Promise<number> {
    const payload = this.clsService.get('payload');
    const service = this.serviceRepository.create({
      name,
      parentId,
      specialtyId,
      insertUserId: payload.id,
    });

    const { id } = await this.serviceRepository.save(service);
    return id;
  }
}
