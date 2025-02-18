import { Base } from 'src/app/entities/base.entity';
import { Exam } from 'src/app/modules/exam/entities/exam.entity';
import { Procedure } from 'src/app/modules/procedure/entities/procedure.entity';
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
