import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar' })
  public codigo: string;

  @Column({ type: 'varchar', length: 120 })
  public n_quarto: string;

  @Column({ type: 'varchar', length: 120 })
  public valor: string;

  @Column({ type: 'boolean', default: false })
  public situacao: boolean;

  @Column({ type: 'timestamp' })
  public data_entrada: Date;

  @Column({ type: 'timestamp' })
  public data_saida: Date;

  @ManyToOne(() => User, user => user.rooms, { onDelete: 'CASCADE' })
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;

}
