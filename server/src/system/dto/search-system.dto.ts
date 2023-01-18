import { IsEnum, IsNotEmpty, IsOptional, IsString } from 'class-validator';

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
