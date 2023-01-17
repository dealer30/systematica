import { IsOptional, IsString } from 'class-validator';

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
