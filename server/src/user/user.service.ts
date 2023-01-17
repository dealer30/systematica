import { EntityRepository } from '@mikro-orm/mysql';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  async create(user: CreateUserDto) {
    const hashPassword = await bcrypt.hash(user['password'], 10);
    user.password = hashPassword;

    const newUser = this.userRepository.create(user);

    await this.userRepository.persistAndFlush(newUser);
    delete newUser.password;
    return newUser;
  }

  async update(uuid: string, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.findOne({ uuid });
    if (!user) return null;

    updateUserDto.password
      ? await bcrypt.hash(updateUserDto.password, 10)
      : null;

    this.userRepository.assign(user, { ...user, ...updateUserDto });

    await this.userRepository.flush();

    delete user.password;
    return user;
  }

  async remove(uuid: string) {
    const user = await this.userRepository.findOne({ uuid });
    if (!user) return null;

    await this.userRepository.removeAndFlush(user);
    delete user.password;
    return user;
  }

  async findAll({ page }: { page: number }) {
    const users = await this.userRepository.findAll({
      limit: 50,
      offset: (page - 1) * 50,
    });
    if (!users) return null;

    users.forEach((user) => {
      delete user.password;
      delete user.id;
    });

    return users;
  }

  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ login: login });

    if (!user) return null;
    return user;
  }
}
