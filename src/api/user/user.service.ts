import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { Rooms } from '../rooms/rooms.entity';
import { DeleteResult } from 'typeorm';
import { CreateRoomsDto } from '../rooms/create-rooms.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rooms)
    private readonly RoomsRepository: Repository<Rooms>,
  ) {}

  public async createRoom(createRoomDto: CreateRoomsDto): Promise<Rooms> {
    const room: Rooms = new Rooms();
    room.codigo = createRoomDto.codigo;
    room.n_quarto = createRoomDto.n_quarto;
    room.valor = createRoomDto.valor;
    room.situacao = createRoomDto.situacao;
    room.data_entrada = new Date(createRoomDto.data_entrada);
    room.data_saida = new Date(createRoomDto.data_saida);

    return this.RoomsRepository.save(room);
  }

  public async addRoomToUser(userId: number, room: Rooms): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }

    user.rooms.push(room); // Adiciona a sala ao usuário
    await this.userRepository.save(user); // Salva as alterações no banco de dados

    return user;
  }

  public findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['rooms'] });
  }

  public getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['rooms'] });
  }

  public async createUser(body: CreateUserDto): Promise<User> {
    const user: User = this.userRepository.create(body);
    user.rooms = [];

    const savedUser = await this.userRepository.save(user);

    const userWithRelations = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.rooms', 'rooms')
      .where('user.id = :id', { id: savedUser.id })
      .getOne();

    return userWithRelations;
  }

  public update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto).then(() => this.userRepository.findOne({ where: { id } }));
  }

  public remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }
}
