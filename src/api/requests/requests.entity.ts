import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  public codigo: number;

  @Column({ type: 'varchar', length: 120 })
  public valor: string;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'CASCADE' })
  owner: User;

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
