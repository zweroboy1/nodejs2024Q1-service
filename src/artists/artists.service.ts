import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateArtistDto } from './dto/create-artist.dto';
import { Artist } from '@prisma/client';
import { CRUDService } from '../shared/interfaces/crud.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';

type ArtistInResponse = Omit<Artist, 'favorite'>;
const artistSelectFields = {
  id: true,
  name: true,
  grammy: true,
};

@Injectable()
export class ArtistsService
  implements CRUDService<ArtistInResponse, CreateArtistDto, CreateArtistDto>
{
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<ArtistInResponse> {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
      select: artistSelectFields,
    });
    return newArtist;
  }

  async findAll(): Promise<ArtistInResponse[]> {
    const artists = await this.prisma.artist.findMany();
    return artists;
  }

  async findOne(id: string): Promise<ArtistInResponse> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
      select: artistSelectFields,
    });
    if (!artist) {
      throw new NotFoundException('Not found artist with this artistId');
    }
    return artist;
  }

  async update(
    id: string,
    createArtistDto: CreateArtistDto,
  ): Promise<ArtistInResponse> {
    const artist = await this.prisma.artist.findUnique({
      where: { id },
    });
    if (!artist) {
      throw new NotFoundException(`Artist with artistId ${id} is not found`);
    }

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: {
        name: createArtistDto.name,
        grammy: createArtistDto.grammy,
      },
      select: artistSelectFields,
    });

    return updatedArtist;
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.artist.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`Artist with artistId ${id} is not found`);
    }
  }
}
