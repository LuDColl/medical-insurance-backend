import { Base } from 'src/entities/base.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class User extends Base {
  @Column()
  name: string;

  @Column()
  hash: string;
}
