import { HttpException, HttpStatus, Injectable } from "@nestjs/common";

import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { PrismaService } from "src/prisma.service";
import { MESSAGES } from "src/constants";
import { hashPassword } from "src/utils";

@Injectable()
export class UsersService {
  constructor(private db: PrismaService) {}

  async create(createUserDto: CreateUserDto) {
    try {
      createUserDto.password = hashPassword(createUserDto.password);
      const newUser = await this.db.user.create({
        data: createUserDto,
        select: { id: true, name: true, orders: true },
      });
      return newUser;
    } catch (error) {
      throw new HttpException(MESSAGES.ERROR_OCCURED, HttpStatus.BAD_REQUEST);
    }
  }

  async findAll() {
    try {
      const users = await this.db.user.findMany({
        select: { id: true, name: true, orders: true },
      });
      if (users) {
        return users;
      }
      throw new HttpException("Users not found", HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        MESSAGES.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: number) {
    try {
      const user = await this.db.user.findUnique({
        where: { id },
        select: { id: true, name: true, orders: true },
      });
      if (user) {
        return user;
      }
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        MESSAGES.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: number, updateUserDto: UpdateUserDto) {
    try {
      const userUpdate = await this.db.user.update({
        where: { id },
        data: updateUserDto,
        select: { id: true, name: true, orders: true },
      });
      if (userUpdate) {
        return this.findOne(id);
      }
      throw new HttpException(
        `Unable to update user info.`,
        HttpStatus.BAD_REQUEST,
      );
    } catch (error) {
      throw new HttpException(
        MESSAGES.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: number) {
    try {
      const userDeleted = await this.db.user.delete({ where: { id } });
      if (userDeleted) {
        return HttpStatus.OK;
      }
      throw new HttpException("User not found", HttpStatus.NOT_FOUND);
    } catch (error) {
      throw new HttpException(
        MESSAGES.INTERNAL_SERVER_ERROR,
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
