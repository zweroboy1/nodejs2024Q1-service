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
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('track/:id')
  @UsePipes(new UuidValidator())
  addTrackToFavorites(@Param('id') trackId: string) {
    this.favoritesService.addTrackToFavorites(trackId);
    return { message: 'Track added to favorites', statusCode: 201 };
  }

  @Delete('track/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  removeTrackFromFavorites(@Param('id') trackId: string) {
    this.favoritesService.removeTrackFromFavorites(trackId);
    return;
  }

  @Post('album/:id')
  @UsePipes(new UuidValidator())
  addAlbumToFavorites(@Param('id') albumId: string) {
    this.favoritesService.addAlbumToFavorites(albumId);
    return { message: 'Album added to favorites', statusCode: 201 };
  }

  @Delete('album/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  removeAlbumFromFavorites(@Param('id') albumId: string) {
    this.favoritesService.removeAlbumFromFavorites(albumId);
    return;
  }

  @Post('artist/:id')
  @UsePipes(new UuidValidator())
  addArtistToFavorites(@Param('id') artistId: string) {
    this.favoritesService.addArtistToFavorites(artistId);
    return { message: 'Artist added to favorites', statusCode: 201 };
  }

  @Delete('artist/:id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  removeArtistFromFavorites(@Param('id') artistId: string) {
    this.favoritesService.removeArtistFromFavorites(artistId);
    return;
  }
}
