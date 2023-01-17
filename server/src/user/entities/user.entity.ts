import { Entity, PrimaryKey, Property, Enum } from '@mikro-orm/core';
import { v4 } from 'uuid';

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
