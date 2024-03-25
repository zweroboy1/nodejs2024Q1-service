import { Prisma } from '@prisma/client';
import { IsString, IsNotEmpty } from 'class-validator';

export class CreateUserDto implements Prisma.UserCreateInput {
  @IsNotEmpty({ message: 'Login should not be empty' })
  @IsString({ message: 'Login should be a string' })
  login: string;

  @IsNotEmpty({ message: 'Password should not be empty' })
  @IsString({ message: 'Password should be a string' })
  password: string;
}