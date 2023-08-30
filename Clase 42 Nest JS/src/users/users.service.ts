import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity.js';

@Injectable()
export class UsersService {
  users: Array<User>;
  lastId: number;

  //private
  constructor() {
    (this.users = []), (this.lastId = 0);
  }

  create(createUserDto: User) {
    if (!this.users.some((user) => user.email === createUserDto.email)) {
      this.users.push({ id: ++this.lastId, ...createUserDto });
      return this.users.filter((user) => user.email === createUserDto.email);
    }
    throw new HttpException('No encontro el user', HttpStatus.NOT_FOUND);
  }

  findAll() {
    return this.users;
  }

  findOne(id: number) {
    return this.users.find((user) => user.id === id);
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    const validUser = this.findOne(id);
    if (validUser) {
      Object.assign(validUser, updateUserDto);
      return validUser;
    }

    throw new HttpException('No encontro el user', HttpStatus.NOT_FOUND);
  }

  remove(id: number) {
    const validUser = this.findOne(id);
    if (validUser) {
      this.users.find((user) => user.id !== id);
      return `This action removes a #${id} user`;
    }
  }
}
