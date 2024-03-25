import { Prisma } from '@prisma/client';
import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto implements Prisma.AlbumCreateInput {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsInt()
  year: number;

  @IsOptional()
  @IsUUID()
  artistId: string | null;
}
