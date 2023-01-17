import { EntityRepository } from '@mikro-orm/core';
import { InjectRepository } from '@mikro-orm/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from 'src/user/entities/user.entity';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { System, SystemUpdates } from './entities/system.entity';

interface SystemQuerySearch {
  description: string;
  acronym: string;
  email: string;
}

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

  async create(system: CreateSystemDto) {
    const newSystem = this.systemRepository.create(system);

    await this.systemRepository.persistAndFlush(newSystem);

    return newSystem;
  }

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

  async getPages() {
    const pages = await this.systemRepository.count();

    return Math.ceil(pages / 50);
  }

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

  async update(
    userUUID: string,
    reason: string,
    uuid: string,
    data: UpdateSystemDto,
  ) {
    const user = await this.userRepository.findOne({ uuid: userUUID });
    if (!user) return null;

    const system = await this.systemRepository.findOne({ uuid });
    if (!system) return null;

    const systemUpdates = this.systemUpdatesRepository.create({
      reason: reason,
      user_name: user.name,
      system,
    });

    await this.systemUpdatesRepository.persistAndFlush(systemUpdates);

    this.systemRepository.assign(system, { ...system, ...data });

    await this.systemRepository.flush();

    return { ...system, ...data };
  }

  async deactivate(uuid: string) {
    const system = await this.systemRepository.findOne({
      uuid,
    });

    if (!system) return null;

    this.systemRepository.assign(system, { status: false });

    await this.systemRepository.flush();

    delete system.id;
    return system;
  }

  async search(page: number, query: Partial<SystemQuerySearch>) {
    if (!query) return null;

    const systems = await this.systemRepository.find(
      {
        description: query.description
          ? { $ilike: `%${query.description}%` }
          : {},
        acronym: query.acronym ? { $ilike: `%${query.acronym}%` } : {},
        email: query.email ? { $ilike: `%${query.email}%` } : {},
      },
      {
        limit: 50,
        offset: (page - 1) * 50,
        orderBy: { description: 'ASC' },
      },
    );

    if (!systems) return null;

    systems.forEach((system) => {
      delete system.id;
    });

    return systems;
  }
}
