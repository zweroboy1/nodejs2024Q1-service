import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty, IsBoolean } from 'class-validator';

export class CreateArtistDto implements Prisma.ArtistCreateInput {
  @IsNotEmpty({ message: 'Name should not be empty' })
  @IsString({ message: 'Name should be a string' })
  name: string;

  @IsBoolean({ message: 'Grammy should be a boolean' })
  grammy: boolean;
}
