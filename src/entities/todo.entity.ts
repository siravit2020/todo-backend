import { TodoStatus } from './../constants/enum';

import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('todo')
export class Todo {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'enum',
    enum: TodoStatus,
  })
  status: TodoStatus;

  @Column({ type: 'text' })
  message: string;

  @CreateDateColumn({ readonly: true })
  createdAt!: Date;

  @UpdateDateColumn({ readonly: true })
  updatedAt!: Date;

  @DeleteDateColumn({ readonly: true, select: false })
  deletedAt!: Date;
}
