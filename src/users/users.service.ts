import { v4 as uuidv4 } from 'uuid';
import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
//import { User, UserWithoutPassword } from './user.interface';

import { User } from '@prisma/client';
import { CRUDService } from '../shared/interfaces/crud.service.interface';
import { PrismaService } from 'src/prisma/prisma.service';

type UserWithoutPassword = Omit<User, 'password'>;

const userSelectFields = {
  id: true,
  login: true,
  version: true,
  createdAt: true,
  updatedAt: true,
};


@Injectable()
export class UsersService
  implements CRUDService<UserWithoutPassword, CreateUserDto, UpdatePasswordDto>
{
  private users: User[] = [];

  constructor(private prisma: PrismaService) { }


  private excludePassword(user: User): UserWithoutPassword {
    const userWithoutPassword: User = { ...user };
    delete userWithoutPassword.password;
    return userWithoutPassword;
  }

  async create(createUserDto: CreateUserDto): Promise<UserWithoutPassword> {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
      select: userSelectFields,
    });
    return newUser;
  }


  async findAll(): Promise<UserWithoutPassword[]> {
    const users = await this.prisma.user.findMany({ select: userSelectFields });
    return users;
  }

  findOne(id: string): UserWithoutPassword {
    const user = this.users.find((u) => u.id === id);
    if (!user) {
      throw new NotFoundException('Not found user with this userId');
    }
    return this.excludePassword(user);
  }

  findByLogin(login: string): User {
    const user = this.users.find((u) => u.login === login);
    return user;
  }

  update(
    id: string,
    updatePasswordDto: UpdatePasswordDto,
  ): UserWithoutPassword {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }

    if (this.users[userIndex].password !== updatePasswordDto.oldPassword) {
      throw new ForbiddenException(`Old password is invalid`);
    }

    const updatedUser: User = {
      ...this.users[userIndex],
      password: updatePasswordDto.newPassword,
      version: this.users[userIndex].version + 1,
      //updatedAt: Date.now(),
    };

    this.users[userIndex] = updatedUser;
    return this.excludePassword(updatedUser);
  }

  remove(id: string): void {
    const userIndex = this.users.findIndex((u) => u.id === id);
    if (userIndex === -1) {
      throw new NotFoundException(`User with id ${id} not found`);
    }
    this.users.splice(userIndex, 1);
  }
}
