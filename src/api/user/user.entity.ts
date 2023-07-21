import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { Requests } from '../requests/requests.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Column({ type: 'varchar', default: 'valor_padrao_aqui' })
  public n_cadastro: string;

  @Column({ type: 'varchar', length: 120 })
  public name: string;

  @Column({ type: 'varchar', length: 120 })
  public cidade: string;

  @Column({ type: 'varchar', length: 120 })
  public celular: string;

  @OneToMany(() => Rooms, (room) => room.owner)
  rooms: Rooms[];

  @OneToMany(() => Requests, (request) => request.owner)
  requests: Requests[];

  /*
   * Create and Update Date Columns
   */

  @CreateDateColumn({ type: 'timestamp' })
  public createdAt!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedAt!: Date;
}
