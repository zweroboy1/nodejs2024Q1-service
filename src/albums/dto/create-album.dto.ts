import {
  IsString,
  IsNotEmpty,
  IsInt,
  IsUUID,
  IsOptional,
} from 'class-validator';

export class CreateAlbumDto {
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
