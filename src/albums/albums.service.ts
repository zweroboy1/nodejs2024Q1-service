import { v4 as uuidv4 } from 'uuid';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from './album.interface';
import { CRUDService } from '../shared/interfaces/crud.service.interface';

@Injectable()
export class AlbumsService
  implements CRUDService<Album, CreateAlbumDto, CreateAlbumDto>
{
  private albums: Album[] = [];

  create(createAlbumDto: CreateAlbumDto): Album {
    const newAlbum: Album = {
      id: uuidv4(),
      ...createAlbumDto,
    };

    this.albums.push(newAlbum);
    return newAlbum;
  }

  findAll(): Album[] {
    return this.albums;
  }

  findOne(id: string): Album {
    const album = this.albums.find((a) => a.id === id);
    if (!album) {
      throw new NotFoundException('Not found album with this albumId');
    }
    return album;
  }

  findManyByIds(ids: string[]): Album[] {
    return this.albums.filter((album) => ids.includes(album.id));
  }

  update(id: string, createAlbumDto: CreateAlbumDto): Album {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with albumId ${id} is not found`);
    }

    const updatedAlbum: Album = {
      ...this.albums[albumIndex],
      name: createAlbumDto.name,
      year: createAlbumDto.year,
      artistId: createAlbumDto.artistId,
    };

    this.albums[albumIndex] = updatedAlbum;
    return updatedAlbum;
  }

  remove(id: string): void {
    const albumIndex = this.albums.findIndex((a) => a.id === id);
    if (albumIndex === -1) {
      throw new NotFoundException(`Album with albumId ${id} is not found`);
    }
    this.albums.splice(albumIndex, 1);
  }
}
