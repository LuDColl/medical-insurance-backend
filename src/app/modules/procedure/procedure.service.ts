import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Procedure } from './entities/procedure.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetProcedureDto } from './dtos/get-procedure.dto';
import { PostProcedureDto } from './dtos/post-procedure.dto';
import { ClsService } from 'nestjs-cls';
import { PAYLOAD } from 'src/app/app.consts';

@Injectable()
export class ProcedureService {
  constructor(
    @InjectRepository(Procedure)
    private readonly procedureRepository: Repository<Procedure>,
    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetProcedureDto[]> {
    const services = await this.procedureRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetProcedureDto, services);
    return response;
  }

  async post({
    name,
    parentId,
    specialtyIds,
  }: PostProcedureDto): Promise<number> {
    const payload = this.clsService.get(PAYLOAD);
    const toSpecialties = specialtyIds.map((id) => ({ id }));

    const service = this.procedureRepository.create({
      name,
      parentId,
      specialties: toSpecialties,
      insertUserId: payload.id,
    });

    const { id } = await this.procedureRepository.save(service);
    return id;
  }
}
