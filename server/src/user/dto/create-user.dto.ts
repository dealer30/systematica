import { IsEnum, IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../entities/user.entity';
export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsEnum(Role, { message: 'Tipo de usuário inválido.' })
  @IsNotEmpty()
  role: Role;

  @IsString()
  @IsNotEmpty()
  login: string;

  @IsString()
  @IsNotEmpty()
  password: string;
}
