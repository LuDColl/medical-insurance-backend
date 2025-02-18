import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Procedure } from './entities/procedure.entity';
import { ProcedureService } from './procedure.service';
import { ProcedureController } from './procedure.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Procedure])],
  providers: [ProcedureService],
  controllers: [ProcedureController],
})
export class ProcedureModule {}
