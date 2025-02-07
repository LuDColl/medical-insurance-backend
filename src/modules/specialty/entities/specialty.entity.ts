import { Base } from 'src/entities/base.entity';
import { Exam } from 'src/modules/exam/entities/exam.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Specialty extends Base {
  @Column()
  name: string;

  @OneToMany(() => Exam, (exam) => exam.specialty)
  exam: Exam[];
}
