import { Module } from '@nestjs/common';
import { SystemService } from './system.service';
import { SystemController } from './system.controller';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { User } from 'src/user/entities/user.entity';
import { System, SystemUpdates } from './entities/system.entity';

@Module({
  imports: [MikroOrmModule.forFeature([System, SystemUpdates, User])],
  controllers: [SystemController],
  providers: [SystemService],
})
export class SystemModule {}
