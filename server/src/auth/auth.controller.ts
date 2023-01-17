import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import { Role } from 'src/user/entities/user.entity';

@ApiTags('Autenticação')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  /*Rota para logar um usuário, é necessário informar o login e a senha pelo body. */
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  login(@Request() req) {
    return this.authService.login(req.user);
  }

  /* Rota para retornar o perfil do usuário, é necessário estar autenticado. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Get('/profile')
  getProfile(@Request() req) {
    delete req.user.password;
    delete req.user.id;
    return req.user;
  }
}
