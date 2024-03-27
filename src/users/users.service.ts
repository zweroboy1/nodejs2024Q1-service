import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { User, Prisma } from '@prisma/client';
import { CRUDService } from '../shared/interfaces/crud.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';

type UserWithoutPassword = Omit<User, 'password'>;
type UserInResponse = Omit<UserWithoutPassword, 'createdAt' | 'updatedAt'> & {
  createdAt: number;
  updatedAt: number;
};

const userSelectFields = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};

@Injectable()
export class UsersService
  implements CRUDService<UserInResponse, CreateUserDto, UpdatePasswordDto>
{
  constructor(private prisma: PrismaService) {}

  private datesToNumbers(user: UserWithoutPassword): UserInResponse {
    return {
      ...user,
      createdAt: new Date(user.createdAt).getTime(),
      updatedAt: new Date(user.updatedAt).getTime(),
    };
  }

  async create(createUserDto: CreateUserDto): Promise<UserInResponse> {
    try {
      const newUser = await this.prisma.user.create({
        data: createUserDto,
        select: userSelectFields,
      });
      return this.datesToNumbers(newUser);
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        if (e.code === 'P2002') {
          throw new BadRequestException('User with this login already exists');
        }
      }
      throw e;
    }
  }

  async findAll(): Promise<UserInResponse[]> {
    const users = await this.prisma.user.findMany({ select: userSelectFields });
    return users.map((user) => this.datesToNumbers(user));
  }

  async findOne(id: string): Promise<UserInResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
      select: userSelectFields,
    });
    if (!user) {
      throw new NotFoundException('Not found user with this userId');
    }
    return this.datesToNumbers(user);
  }

  async update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): Promise<UserInResponse> {
    const user = await this.prisma.user.findUnique({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    if (user.password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Old password is invalid`);
    }
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updatePasswordDto.newPassword,
        version: user.version + 1,
      },
      select: userSelectFields,
    });

    return this.datesToNumbers(updatedUser);
  }

  async remove(id: string): Promise<void> {
    try {
      await this.prisma.user.delete({ where: { id } });
    } catch {
      throw new NotFoundException(`User with id ${id} not found`);
    }
  }
}
