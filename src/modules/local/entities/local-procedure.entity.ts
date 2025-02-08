import { Base } from 'src/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { Local } from './local.entity';
import { Procedure } from 'src/modules/procedure/entities/procedure.entity';

@Entity()
export class LocalProcedure extends Base {
  @Column()
  name: string;

  @Column()
  price: number;

  @ManyToOne(() => Local)
  local: Local;

  @ManyToOne(() => Procedure)
  procedure: Procedure;
}
