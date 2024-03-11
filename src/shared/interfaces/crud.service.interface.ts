import { Resource } from './resource.interface';

export interface CRUDService<T extends Resource, CreateDto, UpdateDto> {
  create(createDto: CreateDto): T;
  findAll(): T[];
  findOne(id: string): T;
  update(id: string, updateDto: UpdateDto): T;
  remove(id: string): void;
}
