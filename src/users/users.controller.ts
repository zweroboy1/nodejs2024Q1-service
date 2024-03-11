import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  HttpCode,
  BadRequestException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { validate } from 'uuid';
import { UuidValidator } from 'src/shared/validators/uuid.validator';

@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UsePipes(new ValidationPipe({ whitelist: true }))
  @Post()
  create(@Body() createUserDto: CreateUserDto) {
    const existingUser = this.usersService.findByLogin(createUserDto.login);
    if (existingUser) {
      throw new BadRequestException('User with this login already exists');
    }
    return this.usersService.create(createUserDto);
  }

  @Get()
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UsePipes(new UuidValidator())
  findOne(@Param('id') id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe())
  update(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    if (!validate(id)) {
      throw new BadRequestException('Invalid userId format');
    }
    return this.usersService.update(id, updatePasswordDto);
  }

  @Delete(':id')
  @UsePipes(new UuidValidator())
  @HttpCode(204)
  remove(@Param('id') id: string) {
    this.usersService.remove(id);
  }
}
