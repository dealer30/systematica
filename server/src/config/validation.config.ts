import { ValidationPipeOptions } from '@nestjs/common';

// configuração da validação de dados
export const ValidationConfig: ValidationPipeOptions = {
  transform: true,
  whitelist: true,
  forbidNonWhitelisted: true,
  transformOptions: {
    enableImplicitConversion: true,
  },
};
