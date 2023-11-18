import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';
import { compare } from 'bcrypt';

import { PrismaService } from 'src/prisma.service';

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  async validateUser(name: string, pass: string) {
    const user = await this.db.user.findUnique({ where: { name } });
    if (user && compare(user.password, pass)) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(user: User) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
