import { IsEnum, IsNotEmpty, IsString } from 'class-validator';

export enum SearchSystemQuery {
  desc = 'description',
  acro = 'acronym',
  email = 'email',
}

export class SearchSystemDto {
  @IsNotEmpty()
  @IsEnum(SearchSystemQuery, {
    message: 'Tipo de busca inválido, deve ser description, acronym ou email.',
  })
  query: SearchSystemQuery;

  @IsNotEmpty()
  @IsString()
  value: string;
}
