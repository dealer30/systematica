import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ValidationConfig } from './config/validation.config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bodyParser: false });

  // habilita validação de dados de forma global
  app.useGlobalPipes(new ValidationPipe(ValidationConfig));

  // habilita o swagger
  const config = new DocumentBuilder()
    .setTitle('Projeto Kingspan')
    .setDescription('UC001 - Manter Sistema')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  app.enableCors();

  await app.listen(process.env['PORT']);
}
bootstrap();
