import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './create-user.dto';
import { User } from './user.entity';
import { Rooms } from '../rooms/rooms.entity';
import { Requests } from '../requests/requests.entity';
import { DeleteResult } from 'typeorm';
import { CreateRoomsDto } from '../rooms/create-rooms.dto';
import { CreateRequestsDto } from '../requests/create-requests.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
    @InjectRepository(Rooms)
    private readonly roomsRepository: Repository<Rooms>,
    @InjectRepository(Requests)
    private readonly requestsRepository: Repository<Requests>,
  ) {}

  async findAll(): Promise<User[]> {
    return this.userRepository.find({ relations: ['rooms', 'requests'] });
  }

  async getUser(id: number): Promise<User> {
    return this.userRepository.findOne({ where: { id }, relations: ['rooms', 'requests'] });
  }

  async createUser(body: CreateUserDto): Promise<User> {
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

  async update(id: number, updateUserDto: CreateUserDto): Promise<User> {
    return this.userRepository.update(id, updateUserDto).then(() => this.userRepository.findOne({ where: { id } }));
  }

  async remove(id: number): Promise<DeleteResult> {
    return this.userRepository.delete(id);
  }

  async createRoom(createRoomDto: CreateRoomsDto): Promise<Rooms> {
    const room: Rooms = new Rooms();
    room.n_quarto = createRoomDto.n_quarto;
    room.valor = createRoomDto.valor;
    room.situacao = createRoomDto.situacao;
    room.data_entrada = new Date(createRoomDto.data_entrada);
    room.data_saida = new Date(createRoomDto.data_saida);

    return this.roomsRepository.save(room);
  }

  async addRoomToUser(userId: number, room: Rooms): Promise<User> {
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

  async createRequest(createRequestsDto: CreateRequestsDto): Promise<Requests> {
    const request: Requests = new Requests();
    request.valor = createRequestsDto.valor;
    request.paymentmethod = createRequestsDto.paymentmethod;

    return this.requestsRepository.save(request);
  }

  async addRequestToUser(userId: number, request: Requests): Promise<User> {
    const user = await this.userRepository
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.requests', 'requests')
      .where('user.id = :id', { id: userId })
      .getOne();

    if (!user) {
      throw new Error('User not found');
    }

    user.requests.push(request); // Adiciona o pedido ao usuário
    await this.userRepository.save(user); // Salva as alterações no banco de dados

    return user;
  }
}
