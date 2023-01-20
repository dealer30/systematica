import { IsOptional, IsString } from 'class-validator';

// essa é uma Dto que é usada para fazer a busca de sistemas por critérios.

export interface SearchSystemQuery {
  description?: string;
  acronym?: string;
  email?: string;
}

export class SearchSystemDto {
  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  acronym: string;

  @IsString()
  @IsOptional()
  email: string;
}
