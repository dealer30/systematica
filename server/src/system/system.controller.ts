import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Delete,
  UseGuards,
  UnprocessableEntityException,
} from '@nestjs/common';
import { SystemService } from './system.service';
import { CreateSystemDto } from './dto/create-system.dto';
import { UpdateSystemDto } from './dto/update-system.dto';
import { JwtAuthGuard } from 'src/auth/guard/jwt-auth.guard';
import { Role } from 'src/user/entities/user.entity';
import { Query, Request } from '@nestjs/common/decorators';
import { ApiTags } from '@nestjs/swagger';
import { SearchSystemDto } from './dto/search-system.dto';

@ApiTags('Sistemas')
@Controller('systems')
export class SystemController {
  constructor(private readonly systemService: SystemService) {}

  /* Rota para criação de novos sistemas. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Post('/')
  async create(@Body() createSystemDto: CreateSystemDto) {
    const newSystem = await this.systemService.create(createSystemDto);

    if (!newSystem)
      throw new UnprocessableEntityException('Impossível concluir a tarefa.');
    return newSystem;
  }

  /* Rota para listar todos os sistemas ou apenas um, caso passe o uuid no query. */
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

      return system;
    } else {
      const systems = await this.systemService.findAll(page);
      if (!systems)
        throw new UnprocessableEntityException('Sistema não existe.');

      return systems;
    }
  }

  /* Rota para retornar a quantidade de páginas. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Get('/pages')
  async pages() {
    return this.systemService.getPages();
  }

  /* Rota para atualização de sistemas */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Patch('/')
  async update(
    @Query('uuid') uuid: string,
    @Body() updateSystemDto: UpdateSystemDto,
    @Request() req: any,
  ) {
    const updatedSystem = await this.systemService.update(
      req.user.uuid,
      updateSystemDto.reason,
      uuid,
      updateSystemDto,
    );
    if (!updatedSystem)
      throw new UnprocessableEntityException('Sistema não existe.');
    return updatedSystem;
  }

  /* Rota para desativar um sistema. */
  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN]))
  @Delete('/')
  async deactivate(@Query('uuid') uuid: string) {
    return await this.systemService.deactivate(uuid);
  }

  @UseGuards(new JwtAuthGuard([Role.SUPER_ADMIN, Role.ADMIN, Role.TECHNICAL]))
  @Get('/search')
  async search(@Body() query: SearchSystemDto, @Query('page') page = 1) {
    if (!query) throw new UnprocessableEntityException('Query inválida.');

    const systems = await this.systemService.search(page, query);

    if (!systems)
      throw new UnprocessableEntityException('Nenhum sistema encontrado.');

    return systems;
  }
}
