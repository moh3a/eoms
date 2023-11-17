import { IsNotEmpty } from 'class-validator';
import { IUser } from './user.type';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto implements IUser {
  @ApiProperty({ example: 'username' })
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @ApiProperty({ example: '******' })
  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;
}
