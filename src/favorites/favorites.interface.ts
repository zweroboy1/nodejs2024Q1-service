import { Album } from 'src/albums/album.interface';
import { Artist } from 'src/artists/artist.interface';
import { Track } from 'src/tracks/track.interface';

export interface Favorites {
  artists: string[];
  albums: string[];
  tracks: string[];
}

export interface FullFavorites {
  artists: Artist[];
  albums: Album[];
  tracks: Track[];
}
