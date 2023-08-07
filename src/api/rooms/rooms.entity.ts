import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, ManyToOne, Generated } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class Rooms {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  public codigo: number;

  @Column({ type: 'varchar', length: 120 })
  public n_quarto: string;

  @Column({ type: 'float' })
  public valor: number;

  @Column({ type: 'boolean', default: false })
  public situacao: boolean;

  @Column({ type: 'timestamp' })
  public data_entrada: Date;

  @Column({ type: 'timestamp' })
  public data_saida: Date;

  @ManyToOne(() => User, (user) => user.rooms, { onDelete: 'NO ACTION' })
  owner: User;

  @CreateDateColumn({ type: 'timestamp' })
  public createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedat!: Date;
}
