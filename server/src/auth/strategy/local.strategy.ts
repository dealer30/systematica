import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthService } from '../auth.service';

// Classe responsável por fazer a autenticação do usuário, através do login e senha.
// Ela é responsável por pegar o login e senha do body da requisição e passar para o AuthService.
// Vale ressaltar a importância do PassportStrategy, que é responsável por fazer a autenticação.
// Para saber mais: https://docs.nestjs.com/security/authentication
@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      usernameField: 'login',
      passwordField: 'password',
    });
  }

  async validate(login: string, password: string): Promise<any> {
    const user = await this.authService.ValidateUser(login, password);
    if (!user) {
      throw new UnauthorizedException('Usuário ou senha inválidos');
    }
    return user;
  }
}
