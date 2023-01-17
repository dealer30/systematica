import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { System } from 'src/system/entities/system.entity';
import { Role, User } from 'src/user/entities/user.entity';

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    const user2 = em.create(User, {
      name: 'Lucas Reis',
      role: Role.SUPER_ADMIN,
      login: 'lucas',
      password: '$2a$10$bJ7tEz5jMVwwgQ6AjXMrg.lCWLZYNDzZs7KN5MPREbYq2exvVKD82',
    });

    const user1 = em.create(User, {
      name: 'Dev Developer',
      role: Role.TECHNICAL,
      login: 'dev',
      password: '$2a$10$3GGaE2bsgUg04zUBXduluOsY9pepvr3YWGoeJOIaHHQXvL5aNjMES',
    });

    em.persistAndFlush([user1, user2]);
  }
}
