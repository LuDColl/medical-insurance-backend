import { Base } from 'src/entities/base.entity';
import { Service } from 'src/modules/service/entities/service.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Specialty extends Base {
  @Column()
  name: string;

  @OneToMany(() => Service, (exam) => exam.specialty)
  services: Service[];
}
