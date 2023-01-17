import {
  Body,
  Controller,
  Delete,
  Post,
  Query,
  UseGuards,
  Get,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UserService } from './user.service';
import { UnprocessableEntityException } from '@nestjs/common';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Role } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';
import { Patch } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
@ApiTags('Usuários')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  /* Rota para criação de novos usuários. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Post('/')
  async create(@Body() user: CreateUserDto) {
    const newUser = await this.userService.create(user);

    if (!newUser)
      throw new UnprocessableEntityException('Impossível concluir a tarefa.');
    return newUser;
  }

  /* Rota para atualização de usuários */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Patch('/')
  async update(@Query('uuid') uuid: string, @Body() user: UpdateUserDto) {
    const updatedUser = await this.userService.update(uuid, user);
    if (!updatedUser)
      throw new UnprocessableEntityException('Usuário não existe.');
    return updatedUser;
  }

  /* Rota para remoção de usuários! */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Delete('/')
  async remove(@Query('uuid') uuid: string) {
    const deletedUser = await this.userService.remove(uuid);
    if (!deletedUser)
      throw new UnprocessableEntityException('Usuário não existe.');
    return deletedUser;
  }

  /* Rota para retornar uma lista de usuários. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Get('/')
  async findAll(@Query('page') page: number) {
    if (!page) page = 1;
    return await this.userService.findAll({ page });
  }
}
