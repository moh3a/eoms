import { Injectable } from '@nestjs/common';
import { compareSync } from 'bcrypt';

import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async validateUser(userId: number, pass: string) {
    const user = await this.usersService.findOne(userId);
    if (user && compareSync(user.password, pass)) {
      delete user.password;
      return user;
    }
    return null;
  }
}
