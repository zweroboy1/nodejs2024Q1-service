import { Controller, Get, Post, Body, Put, Param, Delete, UsePipes, ValidationPipe, HttpCode, BadRequestException, NotFoundException } from '@nestjs/common';
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { validate } from 'uuid';
import { UuidValidator } from 'src/shared/validators/uuid.validator';


@Controller('Track')
export class TracksController {
  constructor(private readonly TracksService: TracksService) { }

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.TracksService.create(createTrackDto);
  }

  @Get()
  findAll() {
    return this.TracksService.findAll();
  }

  @Get(':id')
  @UsePipes(new UuidValidator())
  findOne(@Param('id') id: string) {
    return this.TracksService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(@Param('id') id: string, @Body() updateTrackDto: CreateTrackDto) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid TrackId format');
    }
    return this.TracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.TracksService.remove(id);
  }
}
