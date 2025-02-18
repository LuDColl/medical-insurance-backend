import { Base } from 'src/app/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Local } from './local.entity';
import { Specialty } from 'src/app/modules/specialty/entities/specialty.entity';

@Entity()
export class LocalSpecialty extends Base {
  @Column()
  price: number;

  @ManyToOne(() => Local)
  local: Local;

  @ManyToOne(() => Specialty)
  specialty: Specialty;
}
