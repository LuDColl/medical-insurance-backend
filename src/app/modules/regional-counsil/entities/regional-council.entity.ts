import { Base } from 'src/app/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class RegionalCouncil extends Base {
  @Column()
  acronym: string;
}
