import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';

// Essa é a entidade usada pela ORM para criar a tabela no banco de dados.
// A propriedade uuid é gerada automaticamente pelo uuid v4.
// A propriedade role é um enum que é criado automaticamente pela ORM.
// A propriedade id é gerada automaticamente pelo autoincrement.
// A explicação para se ter ID e UUID ao mesmo tempo é dada nesse gist o qual recomendo a leitura:
// https://gist.github.com/rponte/bf362945a1af948aa04b587f8ff332f8
@Entity()
export class User {
  @PrimaryKey({ autoincrement: true })
  id!: number;

  @Property()
  uuid: string = v4();

  @Property()
  name!: string;

  @Property()
  login!: string;

  @Property()
  password!: string;

  @Enum(() => Role)
  role!: Role;
}

export enum Role {
  SUPER_ADMIN = 'Super Administrator',
  ADMIN = 'Administrator',
  TECHNICAL = 'Technical Responsible',
}
