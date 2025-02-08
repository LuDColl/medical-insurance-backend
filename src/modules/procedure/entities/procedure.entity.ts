import { Base } from 'src/entities/base.entity';
import { LocalProcedure } from 'src/modules/local/entities/local-procedure.entity';
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
export class Procedure extends Base {
  @Column()
  name: string;

  @Column({ nullable: true })
  parentId?: number;

  @JoinTable()
  @ManyToMany(() => Specialty)
  specialties: Specialty[];

  @TreeParent()
  parent?: Procedure;

  @TreeChildren()
  children: Procedure[];

  @OneToMany(() => LocalProcedure, (localProcedure) => localProcedure.procedure)
  localProcedures: LocalProcedure[];
}
