import { Resource } from '../shared/interfaces/resource.interface';

export interface Album extends Resource {
  name: string;
  year: number;
  artistId: string | null;
}
