import { Base } from 'src/app/entities/base.entity';
import { Column, Entity, JoinTable, ManyToMany, OneToMany } from 'typeorm';
import { UserRule } from './user-rule.entity';
import { Company } from 'src/app/modules/company/entities/company.entity';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column({ select: false })
  hash: string;

  @OneToMany(() => UserRule, (userRule) => userRule.user, { cascade: true })
  userRules: UserRule[];

  @JoinTable()
  @ManyToMany(() => Company)
  companies: Company[];
}
