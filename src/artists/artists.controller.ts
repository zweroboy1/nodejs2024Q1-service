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
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { validate } from 'uuid';
import { UuidValidator } from 'src/shared/validators/uuid.validator';

@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get()
  findAll() {
    return this.artistsService.findAll();
  }

  @Get(':id')
  @UsePipes(new UuidValidator())
  findOne(@Param('id') id: string) {
    return this.artistsService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateArtistDto: CreateArtistDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid artistId format');
    }
    return this.artistsService.update(id, updateArtistDto);
  }

  @Delete(':id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  remove(@Param('id') id: string) {
    return this.artistsService.remove(id);
  }
}
