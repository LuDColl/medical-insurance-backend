import { Base } from 'src/entities/base.entity';
import { User } from 'src/modules/user/entities/user.entity';
import { Entity, ManyToMany } from 'typeorm';

@Entity()
export class Company extends Base {
  @ManyToMany(() => User)
  users: User[];
}
