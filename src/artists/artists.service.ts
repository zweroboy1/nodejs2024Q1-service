import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from './artist.interface';
import { CRUDService } from '../shared/interfaces/crud.service.interface';

@Injectable()
export class ArtistsService implements CRUDService<Artist, CreateArtistDto, CreateArtistDto> {
  private artists: Artist[] = [];

  create(createArtistDto: CreateArtistDto): Artist {
    const newArtist: Artist = {
      id: uuidv4(),
      ...createArtistDto,
    };

    this.artists.push(newArtist);
    return newArtist;
  }

  findAll(): Artist[] {
    return this.artists;
  }

  findOne(id: string): Artist {
    const artist = this.artists.find((a) => a.id === id);
    if (!artist) {
      throw new NotFoundException('Not found artist with this artistId');
    }
    return artist;
  }

  update(id: string, createArtistDto: CreateArtistDto): Artist {
    const artistIndex = this.artists.findIndex((a) => a.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with artistId ${id} is not found`);
    }

    const updatedArtist: Artist = {
      ...this.artists[artistIndex],
      name: createArtistDto.name,
      grammy: createArtistDto.grammy,
    };

    this.artists[artistIndex] = updatedArtist;
    return updatedArtist;
  }

  remove(id: string): void {
    const artistIndex = this.artists.findIndex(a => a.id === id);
    if (artistIndex === -1) {
      throw new NotFoundException(`Artist with artistId ${id} is not found`);
    }
    this.artists.splice(artistIndex, 1);
  }
}
