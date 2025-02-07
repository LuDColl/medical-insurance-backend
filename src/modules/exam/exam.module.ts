import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Exam } from './entities/exam.entity';

@Module({ imports: [TypeOrmModule.forFeature([Exam])] })
export class ExamModule {}
