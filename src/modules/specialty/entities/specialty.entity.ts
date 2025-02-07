import { Base } from 'src/entities/base.entity';
import { Exam } from 'src/modules/exam/entities/exam.entity';
import { Procedure } from 'src/modules/procedure/entities/procedure.entity';
import { Column, Entity, ManyToMany } from 'typeorm';

@Entity()
export class Specialty extends Base {
  @Column()
  name: string;

  @ManyToMany(() => Exam)
  exams: Exam[];

  @ManyToMany(() => Procedure)
  procedures: Procedure[];
}
