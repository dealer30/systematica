import { PartialType } from '@nestjs/mapped-types';
import {
  IsString,
  Length,
  IsNotEmpty,
  IsOptional,
  IsBoolean,
} from 'class-validator';
import { CreateSystemDto } from './create-system.dto';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  // interessante ressaltar a importância de usar o PartialType para não ter que
  // reescrever todos os decorators de validação, pois o PartialType faz isso
  // automaticamente.

  // além disso, nessa classe incluí reason(obrigatória) e status(opcional), que são necessárias quando se fala
  // em atualizar um sistema de acordo com a documentação.
  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  reason: string;

  @IsBoolean()
  @IsOptional()
  status: boolean;
}
