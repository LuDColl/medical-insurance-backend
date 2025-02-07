import { Base } from 'src/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class UserRule extends Base {
  @Column()
  path: string;

  @Column({ nullable: true })
  method: string;

  @ManyToOne(() => User, { nullable: false })
  user: User;
}
