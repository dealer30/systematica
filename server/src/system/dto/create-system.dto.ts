import {
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateSystemDto {
  @IsString()
  @Length(1, 100)
  @IsNotEmpty()
  description: string;

  @IsString()
  @Length(1, 10)
  @IsNotEmpty()
  acronym: string;

  @IsEmail({}, { message: 'Email inválido!' })
  @Length(1, 100)
  @IsOptional()
  email: string;

  @IsString()
  @Length(1, 50)
  @IsOptional()
  url: string;
}
