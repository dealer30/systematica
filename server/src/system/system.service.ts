import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateSystemDto } from './dto/create-system.dto';
import { SearchSystemQuery } from './dto/search-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System, SystemUpdates } from './entities/system.entity';

@Injectable()
export class SystemService {
  constructor(
    @InjectRepository(System)
    private readonly systemRepository: EntityRepository<System>,
    @InjectRepository(SystemUpdates)
    private readonly systemUpdatesRepository: EntityRepository<SystemUpdates>,
    @InjectRepository(User)
    private readonly userRepository: EntityRepository<User>,
  ) {}

  // explicação para retornar sem a id está no código fonte da entity.

  // função que cria um sistema no banco de dados e retorna o sistema criado sem a id.
  async create(system: CreateSystemDto) {
    const newSystem = this.systemRepository.create(system);

    await this.systemRepository.persistAndFlush(newSystem);

    delete newSystem.id;

    return newSystem;
  }

  // função que atualiza dados de um sistema específico via uuid.
  // o sistema é retornado sem a id.
  async findAll(page: number) {
    const systems = await this.systemRepository.findAll({
      limit: 50,
      offset: (page - 1) * 50,
      orderBy: { description: 'ASC' },
    });
    if (!systems) return null;

    systems.forEach((system) => {
      delete system.id;
    });

    return systems;
  }

  // função que retorna a quantidade de páginas de sistemas.
  async getPages() {
    const pages = await this.systemRepository.count();

    return Math.ceil(pages / 50);
  }

  // função que retorna um sistema específico via uuid.
  async findOne(uuid: string) {
    const system = await this.systemRepository.findOne({
      uuid,
    });

    if (!system) return null;

    const update = await this.systemUpdatesRepository.findOne(
      {
        system,
      },
      { orderBy: { createdAt: 'DESC' } },
    );

    delete system.id;
    if (!update) return { ...system };

    delete update.id;
    return { ...system, update };
  }

  // função que atualiza dados de um sistema específico via uuid.
  async update(
    userUUID: string,
    reason: string,
    uuid: string,
    data: Omit<UpdateSystemDto, 'reason'>,
  ) {
    const user = await this.userRepository.findOne({ uuid: userUUID });
    if (!user) return null;

    const system = await this.systemRepository.findOne({ uuid });
    if (!system) return null;

    const systemUpdates = this.systemUpdatesRepository.create({
      reason: reason,
      user_name: user.name,
      system: system,
    });

    await this.systemUpdatesRepository.persistAndFlush(systemUpdates);

    delete system.updates;

    this.systemRepository.assign(system, { ...system, ...data });

    await this.systemRepository.flush();

    return { ...system, ...data };
  }

  // função que procura por sistemas com base em uma query.
  async search(page: number, query: SearchSystemQuery) {
    if (!query) return null;

    const queryObject = {};

    // esse é um loop que remove os valores vazios da query.
    for (const [key, value] of Object.entries(query)) {
      if (!value) delete query[key];
      else queryObject[key] = { $like: `%${value}%` };
    }

    const systems = await this.systemRepository.find(queryObject, {
      limit: 50,
      offset: (page - 1) * 50,
      orderBy: { description: 'ASC' },
    });

    const counts = await this.systemRepository.count({
      ...queryObject,
    });

    if (!systems) return null;

    systems.forEach((system) => {
      delete system.id;
    });

    return { ...systems, pages: Math.ceil(counts / 50) };
  }
}
