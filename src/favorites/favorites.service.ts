import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnprocessableEntityException,
} from '@nestjs/common';
import { Favorites, FullFavorites } from './favorites.interface';
import { TracksService } from 'src/tracks/tracks.service';
import { AlbumsService } from 'src/albums/albums.service';
import { ArtistsService } from 'src/artists/artists.service';

@Injectable()
export class FavoritesService {
  constructor(
    private readonly tracksService: TracksService,
    private readonly albumsService: AlbumsService,
    private readonly artistsService: ArtistsService,
  ) {}

  private favorites: Favorites = {
    artists: [],
    albums: [],
    tracks: [],
  };

  findAll(): FullFavorites {
    const fullFavorites: FullFavorites = {
      artists: this.artistsService.findManyByIds(this.favorites.artists),
      albums: this.albumsService.findManyByIds(this.favorites.albums),
      tracks: this.tracksService.findManyByIds(this.favorites.tracks),
    };
    return fullFavorites;
  }

  addTrackToFavorites(trackId: string): void {
    try {
      this.tracksService.findOne(trackId);
    } catch {
      throw new UnprocessableEntityException(
        'Track with specified id does not exist',
      );
    }

    if (this.favorites.tracks.some((favTrack) => favTrack === trackId)) {
      throw new BadRequestException('Track is already in favorites');
    }

    this.favorites.tracks.push(trackId);
  }

  removeTrackFromFavorites(trackId: string): void {
    const index = this.favorites.tracks.findIndex(
      (favTrack) => favTrack === trackId,
    );
    if (index === -1) {
      throw new NotFoundException('Track not found in favorites');
    }
    this.favorites.tracks.splice(index, 1);
  }

  addAlbumToFavorites(albumId: string): void {
    try {
      this.albumsService.findOne(albumId);
    } catch {
      throw new UnprocessableEntityException(
        'Album with specified id does not exist',
      );
    }

    if (this.favorites.albums.some((favAlbum) => favAlbum === albumId)) {
      throw new BadRequestException('Album is already in favorites');
    }

    this.favorites.albums.push(albumId);
  }

  removeAlbumFromFavorites(albumId: string): void {
    const index = this.favorites.albums.findIndex(
      (favAlbum) => favAlbum === albumId,
    );
    if (index === -1) {
      throw new NotFoundException('Album not found in favorites');
    }

    this.favorites.albums.splice(index, 1);
  }

  addArtistToFavorites(artistId: string): void {
    try {
      this.artistsService.findOne(artistId);
    } catch {
      throw new UnprocessableEntityException(
        'Artist with specified id does not exist',
      );
    }

    if (this.favorites.artists.some((favArtist) => favArtist === artistId)) {
      throw new BadRequestException('Artist is already in favorites');
    }

    this.favorites.artists.push(artistId);
  }

  removeArtistFromFavorites(artistId: string): void {
    const index = this.favorites.artists.findIndex(
      (favArtist) => favArtist === artistId,
    );
    if (index === -1) {
      throw new NotFoundException('Artist not found in favorites');
    }

    this.favorites.artists.splice(index, 1);
  }
}
