import { Controller, Get, Post, Request, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './guard/jwt-auth.guard';
import { LocalAuthGuard } from './guard/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';

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
  @UseGuards(new JwtAuthGuard(['Aluno', 'Professor', 'Colaborador']))
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
