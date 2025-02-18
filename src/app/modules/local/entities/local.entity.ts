import { Base } from 'src/app/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { LocalExam } from './local-exam.entity';
import { LocalProcedure } from './local-procedure.entity';

@Entity()
export class Local extends Base {
  @Column()
  name: string;

  @OneToMany(() => LocalExam, (localExam) => localExam.local)
  localExam: LocalExam;

  @OneToMany(() => LocalProcedure, (localProcedure) => localProcedure.local)
  localProcedures: LocalExam;
}
