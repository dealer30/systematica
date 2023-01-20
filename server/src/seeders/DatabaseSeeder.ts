import type { EntityManager } from '@mikro-orm/core';
import { Seeder } from '@mikro-orm/seeder';
import { System } from 'src/system/entities/system.entity';
import { Role, User } from 'src/user/entities/user.entity';

// Essa é uma classe usada para popular o banco de dados com dados iniciais
// Para que o sistema possa ser testado sem a necessidade de criar um usuário
// ou empenhar esforços para criar um sistema.
// Para executar essa classe, basta rodar o comando:
// npm run seeder:run -- -c src/seeders/DatabaseSeeder.ts

export class DatabaseSeeder extends Seeder {
  async run(em: EntityManager): Promise<void> {
    // login: lucas | password: lucas
    const user2 = em.create(User, {
      name: 'Lucas Reis',
      role: Role.SUPER_ADMIN,
      login: 'lucas',
      password: '$2a$10$bJ7tEz5jMVwwgQ6AjXMrg.lCWLZYNDzZs7KN5MPREbYq2exvVKD82',
    });

    // login: dev | password: dev
    const user1 = em.create(User, {
      name: 'Dev Developer',
      role: Role.TECHNICAL,
      login: 'dev',
      password: '$2a$10$3GGaE2bsgUg04zUBXduluOsY9pepvr3YWGoeJOIaHHQXvL5aNjMES',
    });

    const system1 = em.create(System, {
      description:
        'Um sistema muito maneiro é um sistema de teste útil para automatizar testes',
      acronym: 'USMM',
      url: 'https://usmm.com.br',
      email: 'lucas@lucas.com',
    });

    const system2 = em.create(System, {
      description: 'Agropecuária Tech é um sistema de automação de fazendas',
      acronym: 'AgroTech',
      url: 'https://agrotech.com.br',
      email: 'agro@tech.br',
    });

    em.persistAndFlush([user1, user2, system1, system2]);
  }
}
