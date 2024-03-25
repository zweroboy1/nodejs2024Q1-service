import { Resource } from './resource.interface';

export interface CRUDService<T extends Resource, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<T> | T;
  findAll(): Promise<T[]> | T[];
  findOne(id: string): Promise<T> | T;
  update(id: string, updateDto: UpdateDto): Promise<T> | T;
  remove(id: string): void;
}
