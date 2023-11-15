import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = this.usersRepository.create(createUserDto);
    await this.usersRepository.save(newUser);
    return newUser;
  }

  async findAll() {
    const users = await this.usersRepository.find();
    if (users) {
      return users;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async findOne(id: number) {
    const user = await this.usersRepository.findOneBy({ id });
    if (user) {
      return user;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    const userUpdate = await this.usersRepository.update({ id }, updateUserDto);
    if (userUpdate.affected) {
      return this.findOne(id);
    }
    throw new HttpException(
      `Unable to update user info.`,
      HttpStatus.BAD_REQUEST,
    );
  }

  async remove(id: number) {
    const userDeleted = await this.usersRepository.delete(id);
    if (userDeleted.affected) {
      return HttpStatus.OK;
    }
    throw new HttpException('User not found', HttpStatus.NOT_FOUND);
  }
}
