import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll() {
    const favArtists = await this.prisma.artist.findMany({
      where: { favorite: true },
      select: {
        id: true,
        name: true,
        grammy: true,
      },
    });
    const favAlbums = await this.prisma.album.findMany({
      where: { favorite: true },
      select: {
        id: true,
        name: true,
        year: true,
        artistId: true,
      },
    });
    const favTracks = await this.prisma.track.findMany({
      where: { favorite: true },
      select: {
        id: true,
        name: true,
        duration: true,
        artistId: true,
        albumId: true,
      },
    });
    const fullFavorites = {
      artists: favArtists,
      albums: favAlbums,
      tracks: favTracks,
    };
    return fullFavorites;
  }

  async addTrackToFavorites(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new UnprocessableEntityException(
        'Track with specified id does not exist',
      );
    }

    if (track.favorite) {
      throw new BadRequestException('Track is already in favorites');
    }

    await this.prisma.track.update({
      where: { id },
      data: {
        favorite: true,
      },
    });
  }

  async removeTrackFromFavorites(id: string): Promise<void> {
    const track = await this.prisma.track.findUnique({
      where: { id },
    });
    if (!track) {
      throw new NotFoundException('Track not found in favorites');
    }
    await this.prisma.track.update({
      where: { id },
      data: {
        favorite: false,
      },
    });
  }

  async addArtistToFavorites(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new UnprocessableEntityException(
        'Artist with specified id does not exist',
      );
    }

    if (artist.favorite) {
      throw new BadRequestException('Artist is already in favorites');
    }

    await this.prisma.artist.update({
      where: { id },
      data: {
        favorite: true,
      },
    });
  }

  async removeArtistFromFavorites(id: string): Promise<void> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException('Artist not found in favorites');
    }
    await this.prisma.artist.update({
      where: { id },
      data: {
        favorite: false,
      },
    });
  }

  async addAlbumToFavorites(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new UnprocessableEntityException(
        'Album with specified id does not exist',
      );
    }

    if (album.favorite) {
      throw new BadRequestException('Album is already in favorites');
    }

    await this.prisma.album.update({
      where: { id },
      data: {
        favorite: true,
      },
    });
  }

  async removeAlbumFromFavorites(id: string): Promise<void> {
    const album = await this.prisma.album.findUnique({
      where: { id },
    });
    if (!album) {
      throw new NotFoundException('Album not found in favorites');
    }
    await this.prisma.album.update({
      where: { id },
      data: {
        favorite: false,
      },
    });
  }
}
