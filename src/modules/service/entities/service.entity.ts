import { Base } from 'src/entities/base.entity';
import { Specialty } from 'src/modules/specialty/entities/specialty.entity';
import {
  Column,
  Entity,
  ManyToOne,
  Tree,
  TreeChildren,
  TreeParent,
} from 'typeorm';

@Entity()
@Tree('adjacency-list')
export class Service extends Base {
  @Column()
  name: string;

  @Column()
  specialtyId: number;

  @Column({ nullable: true })
  parentId?: number;

  @ManyToOne(() => Specialty, { nullable: true })
  specialty?: Specialty;

  @TreeParent()
  parent?: Service;

  @TreeChildren()
  children?: Service[];
}
