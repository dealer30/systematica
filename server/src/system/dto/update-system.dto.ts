import { PartialType } from '@nestjs/mapped-types';
import { IsString, Length, IsNotEmpty } from 'class-validator';
import { CreateSystemDto } from './create-system.dto';

export class UpdateSystemDto extends PartialType(CreateSystemDto) {
  @IsString()
  @Length(1, 500)
  @IsNotEmpty()
  reason: string;
}
