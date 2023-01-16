import { Options } from '@mikro-orm/core';
import { ConfigService } from './config/config.service';

// configuração do mikro-orm
const config: Options = new ConfigService(process.env).getMikroOrmConfig();

export default config;
