import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from '@prisma/client';
import { CRUDService } from '../shared/interfaces/crud.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';

type TrackInResponse = Omit<Track, 'favorite'>;
const trackSelectFields = {
  id: true,
  name: true,
  duration: true,
  artistId: true,
  albumId: true,
};

@Injectable()
export class TracksService
  implements CRUDService<TrackInResponse, CreateTrackDto, CreateTrackDto>
{
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<TrackInResponse> {
    const newTrack = await this.prisma.track.create({
      data: createTrackDto,
      select: trackSelectFields,
    });
    return newTrack;
  }

  async findAll(): Promise<TrackInResponse[]> {
    const tracks = await this.prisma.track.findMany();
    return tracks;
  }

  async findOne(id: string): Promise<TrackInResponse> {
    const track = await this.prisma.track.findUnique({
      where: { id },
      select: trackSelectFields,
    });
    if (!track) {
      throw new NotFoundException('Not found track with this trackId');
    }
    return track;
  }

  async update(
    id: string,
    createTrackDto: CreateTrackDto,
  ): Promise<TrackInResponse> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException(`Track with trackId ${id} is not found`);
    }

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: {
        name: createTrackDto.name,
        artistId: createTrackDto.artistId,
        albumId: createTrackDto.albumId,
        duration: createTrackDto.duration,
      },
      select: trackSelectFields,
    });

    return updatedTrack;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.track.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Track with trackId ${id} is not found`);
    }
  }
}
