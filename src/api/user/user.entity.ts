import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Generated } from 'typeorm';
import { Rooms } from '../rooms/rooms.entity';
import { Requests } from '../requests/requests.entity';
@Entity()
export class User {
  @PrimaryGeneratedColumn()
  public id!: number;

  @Generated('increment')
  @Column({ type: 'int', unique: true })
  public n_cadastro: number;

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
  public createdat!: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  public updatedat!: Date;
}
