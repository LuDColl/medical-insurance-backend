import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Local } from './entities/local.entity';
import { LocalProcedure } from './entities/local-procedure.entity';
import { LocalExam } from './entities/local-exam.entity';
import { LocalSpecialty } from './entities/local-specialty.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Local,
      LocalProcedure,
      LocalExam,
      LocalSpecialty,
    ]),
  ],
})
export class LocalModule {}
