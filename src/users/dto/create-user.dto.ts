import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';

export class CreateUserDto implements Partial<User> {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @ApiProperty({ example: '******' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;
}
