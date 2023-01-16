import { Inject, Injectable } from '@nestjs/common';
import { User } from 'src/users/entities/user.entity';
import * as bcrypt from 'bcrypt';
import { Loaded } from '@mikro-orm/core';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(UsersService)
    private readonly user_service: UsersService,
    private jwtService: JwtService,
  ) {}

  // função que valida o usuário de acordo com login e senha, comparando sua hash.
  async ValidateUser(login: string, senha: string): Promise<Loaded<User>> {
    const user = await this.user_service.findByLogin(login);
    if (!user) return null;

    const isPasswordValid = await bcrypt.compare(senha, user.password);

    if (!isPasswordValid) return null;

    return user;
  }

  // função que gera o token de acesso.
  async login(user: User) {
    const payload = { sub: user.uuid, username: user.login, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
