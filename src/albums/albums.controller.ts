import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { validate } from 'uuid';
import { UuidValidator } from 'src/shared/validators/uuid.validator';

@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get()
  findAll() {
    return this.albumsService.findAll();
  }

  @Get(':id')
  @UsePipes(new UuidValidator())
  findOne(@Param('id') id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateAlbumDto: CreateAlbumDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid albumId format');
    }
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.albumsService.remove(id);
  }
}
