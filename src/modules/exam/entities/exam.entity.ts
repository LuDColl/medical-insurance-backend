import { Base } from 'src/entities/base.entity';
import { Specialty } from 'src/modules/specialty/entities/specialty.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Exam extends Base {
  @Column()
  name: string;

  @ManyToOne(() => Specialty, { nullable: true })
  specialty: Specialty;
}
