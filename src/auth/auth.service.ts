import { Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { compareSync } from "bcrypt";
import { User } from "@prisma/client";

import { PrismaService } from "src/prisma.service";

@Injectable()
export class AuthService {
  constructor(private db: PrismaService, private jwtService: JwtService) {}

  async validateUser(name: string, pass: string) {
    const user = await this.db.user.findUnique({ where: { name } });
    if (user && compareSync(pass, user.password)) {
      // @ts-ignore
      delete user.password;
      return user;
    }
    return null;
  }

  /**
   * After the login credentials were validated by local passport
   * We sign the payload and return as a JWT access token
   */
  async login(user: Omit<User, "password">) {
    const payload = { username: user.name, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
