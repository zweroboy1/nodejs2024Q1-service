import { Resource } from '../shared/interfaces/resource.interface';

export interface Artist extends Resource {
  name: string;
  grammy: boolean;
}
