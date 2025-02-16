import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RegionalCouncil } from './entities/regional-council.entity';
import { RegionalCouncilService } from './regional-council.service';
import { RegionalCouncilController } from './regional-council.controller';

@Module({
  imports: [TypeOrmModule.forFeature([RegionalCouncil])],
  providers: [RegionalCouncilService],
  controllers: [RegionalCouncilController],
})
export class RegionalCouncilModule {}
