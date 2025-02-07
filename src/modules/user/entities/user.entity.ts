import { Base } from 'src/entities/base.entity';
import { Column, Entity, OneToMany } from 'typeorm';
import { UserRule } from './user-rule.entity';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column({ select: false })
  hash: string;

  @OneToMany(() => UserRule, (userRule) => userRule.user, { cascade: true })
  userRules: UserRule[];
}
