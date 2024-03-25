import { Prisma } from '@prisma/client';
import { IsString, IsOptional, IsNumber, IsUUID } from 'class-validator';

export class CreateTrackDto implements Prisma.TrackCreateInput {
  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  @IsUUID()
  artistId: string | null;

  @IsOptional()
  @IsString()
  @IsUUID()
  albumId: string | null;

  @IsNumber()
  duration: number;
}
