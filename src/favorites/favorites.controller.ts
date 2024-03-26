import {
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  UsePipes,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';
import { UuidValidator } from 'src/shared/validators/uuid.validator';

@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @UsePipes(new UuidValidator())
  async addTrackToFavorites(@Param('id') trackId: string) {
    await this.favoritesService.addTrackToFavorites(trackId);
    return { message: 'Track added to favorites', statusCode: 201 };
  }

  @Delete('track/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  async removeTrackFromFavorites(@Param('id') trackId: string) {
    await this.favoritesService.removeTrackFromFavorites(trackId);
  }

  @Post('album/:id')
  @UsePipes(new UuidValidator())
  async addAlbumToFavorites(@Param('id') albumId: string) {
    await this.favoritesService.addAlbumToFavorites(albumId);
    return { message: 'Album added to favorites', statusCode: 201 };
  }

  @Delete('album/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  async removeAlbumFromFavorites(@Param('id') albumId: string) {
    await this.favoritesService.removeAlbumFromFavorites(albumId);
  }

  @Post('artist/:id')
  @UsePipes(new UuidValidator())
  async addArtistToFavorites(@Param('id') artistId: string) {
    await this.favoritesService.addArtistToFavorites(artistId);
    return { message: 'Artist added to favorites', statusCode: 201 };
  }

  @Delete('artist/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  async removeArtistFromFavorites(@Param('id') artistId: string) {
    await this.favoritesService.removeArtistFromFavorites(artistId);
  }
}
