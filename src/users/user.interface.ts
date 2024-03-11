import { Resource } from '../shared/interfaces/resource.interface';

export interface User extends Resource {
  login: string;
  password: string;
  version: number;
  createdAt: number;
  updatedAt: number;
}

export type UserWithoutPassword = Omit<User, 'password'>;
