import { IsNotEmpty } from 'class-validator';
import { IUser } from '../user';

export class CreateUserDto implements IUser {
  @IsNotEmpty({ message: 'Name cannot be empty.' })
  name: string;

  @IsNotEmpty({ message: 'Password cannot be empty.' })
  password: string;
}
