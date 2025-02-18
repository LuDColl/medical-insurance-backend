import { Base } from 'src/app/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Local } from './local.entity';
import { Exam } from 'src/app/modules/exam/entities/exam.entity';

@Entity()
export class LocalExam extends Base {
  @Column()
  price: number;

  @ManyToOne(() => Local)
  local: Local;

  @ManyToOne(() => Exam)
  exam: Exam;
}
