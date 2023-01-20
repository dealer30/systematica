import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { jwtConstants } from '../constants';
import { UserService } from 'src/user/user.service';

// Classe responsável por fazer a autenticação do usuário, através do token.
// Ela é responsável por pegar o token do header da requisição e passar para o AuthService.
// Se o token for válido, o usuário é retornado, caso contrário, retorna null.
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly user_service: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: jwtConstants.secret,
    });
  }

  async validate(payload: any) {
    const user = this.user_service.findByLogin(payload.username);
    if (!user) return null;

    return user;
  }
}
