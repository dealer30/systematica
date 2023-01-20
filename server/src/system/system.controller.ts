import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Role } from 'src/user/entities/user.entity';
import { Query, Request } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { SearchSystemDto } from './dto/search-system.dto';

@ApiTags('Sistemas')
@Controller('systems')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  /* Rota para criação de novos sistemas.
  De acordo com a documentação, apenas Super Administrators podem realizar essa função. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Post('/')
  async create(@Body() createSystemDto: CreateSystemDto) {
    const newSystem = await this.systemService.create(createSystemDto);

    if (!newSystem)
      throw new UnprocessableEntityException('Impossível concluir a tarefa.');
    return newSystem;
  }

  /* Rota para listar todos os sistemas ou apenas um, caso passe o uuid no query.
  Todos os usuários desde que autenticados podem acessar. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Get('/')
  async find(
    @Query('uuid') uuid: string | null = null,
    @Query('page') page = 1,
  ) {
    if (uuid) {
      const system = await this.systemService.findOne(uuid);
      if (!system)
        throw new UnprocessableEntityException('Sistema não existe.');

      delete system.updates;
      return system;
    } else {
      const systems = await this.systemService.findAll(page);
      if (!systems)
        throw new UnprocessableEntityException('Sistema não existe.');

      return systems;
    }
  }

  /* Rota para retornar a quantidade de páginas de sistemas.
   Todos os usuários desde que autenticados podem acessar.*/
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Get('/pages')
  async pages() {
    return this.systemService.getPages();
  }

  /* Rota para atualização de sistemas.
  Todos os usuários desde que autenticados podem acessar.*/
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Patch('/')
  async update(
    @Query('uuid') uuid: string,
    @Body() updateSystemDto: UpdateSystemDto,
    @Request() req: any,
  ) {
    const reason = updateSystemDto.reason;
    delete updateSystemDto.reason;
    const updatedSystem = await this.systemService.update(
      req.user.uuid,
      reason,
      uuid,
      updateSystemDto,
    );
    if (!updatedSystem)
      throw new UnprocessableEntityException('Sistema não existe.');
    return updatedSystem;
  }

  /* Rota para buscar um sistema por um critério específico (acronym, description ou email).
  Todos os usuários desde que autenticados podem acessar.*/
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Post('/search')
  async search(@Body() search: SearchSystemDto, @Query('page') page = 1) {
    if (!search) throw new UnprocessableEntityException('Query inválida.');

    const systems = await this.systemService.search(page, search);

    if (!systems)
      throw new UnprocessableEntityException('Nenhum sistema encontrado.');

    return systems;
  }
}
