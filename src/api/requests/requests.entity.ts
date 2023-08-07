import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, Generated, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Requests {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  public codigo: number;

  @Column({ type: 'float' })
  public valor: number;

  @Column({ type: 'varchar', length: 24 })
  public paymentmethod: string;

  @ManyToOne(() => User, (user) => user.requests, { onDelete: 'NO ACTION' })
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedat!: Date;
}
