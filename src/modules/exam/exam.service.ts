import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';
import { Repository } from 'typeorm';
import { plainToInstance } from 'class-transformer';
import { GetExamDto } from './dtos/get-exam.dto';
import { PostExamDto } from './dtos/post-exam.dto';
import { ClsService } from 'nestjs-cls';
import { Base } from 'src/entities/base.entity';

@Injectable()
export class ExamService {
  constructor(
    @InjectRepository(Exam)
    private readonly examRepository: Repository<Exam>,

    private readonly clsService: ClsService,
  ) {}

  async getAll(): Promise<GetExamDto[]> {
    const services = await this.examRepository.find({
      select: { id: true, name: true },
    });

    const response = plainToInstance(GetExamDto, services);
    return response;
  }

  async post({ name, parentId, specialtyIds }: PostExamDto): Promise<number> {
    const payload = this.clsService.get('payload');
    const toSpecialties = specialtyIds.map((id) => ({ id }));

    const service = this.examRepository.create({
      name,
      parentId,
      specialties: toSpecialties,
      insertUserId: payload.id,
    });

    const { id } = await this.examRepository.save(service);
    return id;
  }
}
