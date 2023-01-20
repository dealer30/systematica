import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { AppModule } from './app.module';
import { ValidationConfig } from './config/validation.config';
import { Logger, LoggerErrorInterceptor } from 'nestjs-pino';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: true,
    bufferLogs: true,
  });
  const logger = app.get(Logger);

  // habilita o helmet
  app.use(helmet());

  // habilita o logger
  app.useLogger(logger);
  app.useGlobalInterceptors(new LoggerErrorInterceptor());

  // habilita validação de dados de forma global
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));

  // habilita o swagger
  const config = new DocumentBuilder()
    .setTitle('Systematica')
    .setDescription('UC001 - Manter Sistema')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  // habilita o CORS
  app.enableCors();

  await app.listen(process.env['PORT']);
}
bootstrap();
