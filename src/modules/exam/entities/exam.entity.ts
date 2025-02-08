import { Base } from 'src/entities/base.entity';
import { LocalExam } from 'src/modules/local/entities/local-exam.entity';
import { Specialty } from 'src/modules/specialty/entities/specialty.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  OneToMany,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('adjacency-list')
export class Exam extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  parentId?: number;

  @JoinTable()
  @ManyToMany(() => Specialty, { cascade: true })
  specialties: Specialty[];

  @TreeParent()
  parent?: Exam;

  @TreeChildren()
  children?: Exam[];

  @OneToMany(() => LocalExam, (localExam) => localExam.exam)
  localExams: LocalExam[];
}
