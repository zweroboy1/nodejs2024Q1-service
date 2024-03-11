import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateTrackDto } from './dto/create-track.dto';
import { Track } from './track.interface';
import { CRUDService } from '../shared/interfaces/crud.service.interface';

@Injectable()
export class TracksService implements CRUDService<Track, CreateTrackDto, CreateTrackDto> {
  private tracks: Track[] = [];

  create(createTrackDto: CreateTrackDto): Track {
    const newTrack: Track = {
      id: uuidv4(),
      ...createTrackDto,
    };

    this.tracks.push(newTrack);
    return newTrack;
  }

  findAll(): Track[] {
    return this.tracks;
  }

  findOne(id: string): Track {
    const track = this.tracks.find((a) => a.id === id);
    if (!track) {
      throw new NotFoundException('Not found track with this trackId');
    }
    return track;
  }

  update(id: string, createTrackDto: CreateTrackDto): Track {
    const trackIndex = this.tracks.findIndex((a) => a.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with trackId ${id} is not found`);
    }

    const updatedTrack: Track = {
      ...this.tracks[trackIndex],
      name: createTrackDto.name,
      artistId: createTrackDto.artistId,
      albumId: createTrackDto.albumId,
      duration: createTrackDto.duration,
    };

    this.tracks[trackIndex] = updatedTrack;
    return updatedTrack;
  }

  remove(id: string): void {
    const trackIndex = this.tracks.findIndex(a => a.id === id);
    if (trackIndex === -1) {
      throw new NotFoundException(`Track with trackId ${id} is not found`);
    }
    this.tracks.splice(trackIndex, 1);
  }
}
