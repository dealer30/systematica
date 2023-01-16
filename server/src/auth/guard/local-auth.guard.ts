import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

// Classe que serve como um midleware que pega o usuário e senha do body e verifica se o usuário existe e se a senha está correta.
@Injectable()
export class LocalAuthGuard extends AuthGuard('local') {}
