import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
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
  updateId?: number;
}
