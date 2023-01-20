import { CacheModule, Module } from '@nestjs/common';
import { MikroOrmModule } from '@mikro-orm/nestjs';
import { configService } from './config/config.service';
import { SystemModule } from './system/system.module';
import { AuthModule } from './auth/auth.module';
import { LoggerModule } from 'nestjs-pino/LoggerModule';

@Module({
  imports: [
    MikroOrmModule.forRoot(configService.getMikroOrmConfig()),
    SystemModule,
    AuthModule,
    LoggerModule.forRoot(configService.getLoggerConfig()),
    CacheModule.register(configService.getCacheConfig()),
  ],
})
export class AppModule {}
