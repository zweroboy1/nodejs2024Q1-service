import { Resource } from '../shared/interfaces/resource.interface';

export interface Track extends Resource {
  name: string;
  artistId: string | null;
  albumId: string | null;
  duration: number;
}