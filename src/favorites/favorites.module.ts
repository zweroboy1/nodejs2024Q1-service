import { Module } from '@nestjs/common';
import { TracksModule } from 'src/tracks/tracks.module';
import { AlbumsModule } from 'src/albums/albums.module';
import { ArtistsModule } from 'src/artists/artists.module';
import { FavoritesService } from './favorites.service';
import { FavoritesController } from './favorites.controller';

@Module({
  imports: [TracksModule, AlbumsModule, ArtistsModule],
  providers: [FavoritesService],
  controllers: [FavoritesController]
})
export class FavoritesModule { }