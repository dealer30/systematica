import {
  Entity,
  OneToMany,
  ManyToOne,
  PrimaryKey,
  Property,
} from '@mikro-orm/core';
import { v4 } from 'uuid';

@Entity()
export class System {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  uuid: string = v4();

  @Property()
  description!: string;

  @Property()
  acronym!: string;

  @Property({ nullable: true })
  email: string;

  @Property({ nullable: true })
  url: string;

  @Property({ default: true })
  status!: boolean;

  @OneToMany(() => SystemUpdates, (a) => a.system)
  updates: SystemUpdates[];
}

@Entity()
export class SystemUpdates {
  @PrimaryKey({ autoincrement: true })
  id: number;

  @Property()
  user_name!: string;

  @Property()
  reason!: string;

  @Property()
  createdAt: Date = new Date();

  @ManyToOne()
  system: System;
}
