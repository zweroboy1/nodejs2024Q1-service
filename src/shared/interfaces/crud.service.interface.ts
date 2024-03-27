import { Resource } from './resource.interface';

export interface CRUDService<T extends Resource, CreateDto, UpdateDto> {
  create(createDto: CreateDto): Promise<T>;
  findAll(): Promise<T[]>;
  findOne(id: string): Promise<T>;
  update(id: string, updateDto: UpdateDto): Promise<T>;
  remove(id: string): void;
}
