import { User } from 'src/app/modules/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

export abstract class Base {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ select: false })
  insertDate: string;

  @DeleteDateColumn({ select: false })
  deleteDate?: string;

  @Column({ nullable: true, select: false })
  previousId?: number;

  @Column({ select: false })
  insertUserId: number;

  @ManyToOne(() => User, { createForeignKeyConstraints: false })
  @JoinColumn({ name: 'insertUserId' })
  insertUser: User;
}
