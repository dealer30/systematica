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

  // função que cria um usuário no banco de dados, criptografa a senha e retorna o usuário criado
  // sem a senha para proteger a mesma.
  async create(user: CreateUserDto) {
    const hashPassword = await bcrypt.hash(user['password'], 10);
    user.password = hashPassword;

    const newUser = this.userRepository.create(user);

    await this.userRepository.persistAndFlush(newUser);
    delete newUser.password;
    return newUser;
  }

  // função que atualiza dados de um usuário específico via uuid.
  // a senha é criptografada e o usuário é retornado sem a senha.
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

  // função que remove um usuário específico via uuid.
  async remove(uuid: string) {
    const user = await this.userRepository.findOne({ uuid });
    if (!user) return null;

    await this.userRepository.removeAndFlush(user);
    delete user.password;
    return user;
  }

  // função que retorna todos os usuários cadastrados no banco de dados.
  // a senha e o id são removidos para segurança.
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

  // função que retorna um usuário de acordo com o login. é utilizada no guard de autenticação.
  async findByLogin(login: string) {
    const user = await this.userRepository.findOne({ login: login });

    if (!user) return null;
    return user;
  }
}
