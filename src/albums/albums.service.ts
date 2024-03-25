import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateAlbumDto } from './dto/create-album.dto';
import { Album } from '@prisma/client';
import { CRUDService } from '../shared/interfaces/crud.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';

type AlbumInResponse = Omit<Album, 'favorite'>;
const albumSelectFields = {
  id: true,
  name: true,
  year: true,
  artistId: true,
};

@Injectable()
export class AlbumsService
  implements CRUDService<AlbumInResponse, CreateAlbumDto, CreateAlbumDto>
{
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto): Promise<AlbumInResponse> {
    const newAlbum = await this.prisma.album.create({
      data: createAlbumDto,
      select: albumSelectFields,
    });
    return newAlbum;
  }

  async findAll(): Promise<AlbumInResponse[]> {
    const albums = await this.prisma.album.findMany();
    return albums;
  }

  async findOne(id: string): Promise<AlbumInResponse> {
    const album = await this.prisma.album.findUnique({
      where: { id },
      select: albumSelectFields,
    });
    if (!album) {
      throw new NotFoundException('Not found album with this albumId');
    }
    return album;
  }

  async update(
    id: string,
    createAlbumDto: CreateAlbumDto,
  ): Promise<AlbumInResponse> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException(`Album with albumId ${id} is not found`);
    }

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: {
        name: createAlbumDto.name,
        year: createAlbumDto.year,
        artistId: createAlbumDto.artistId,
      },
      select: albumSelectFields,
    });

    return updatedAlbum;
  }
  /*
    updateArtistId(albumId: string, artistId: string | null): void {
      const album = this.findOne(albumId);
      album.artistId = artistId;
    }
  */
  async remove(id: string): Promise<void> {
    try {
      await this.prisma.album.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Album with albumId ${id} is not found`);
    }
    /*
        const albumIndex = this.albums.findIndex((a) => a.id === id);
        if (albumIndex === -1) {
          throw new NotFoundException(`Album with albumId ${id} is not found`);
        }
    
        const tracksToRemove = this.tracksService.findByAlbumId(id);
    
        tracksToRemove.forEach((track) => {
          this.tracksService.updateAlbumId(track.id, null);
        });
    
        this.albums.splice(albumIndex, 1);*/
  }
}
