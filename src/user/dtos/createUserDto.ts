
import { IsString, IsEmail, IsNotEmpty,IsStrongPassword } from 'class-validator';
import UserType from '../enums/userType';
export class CreateUserDto {
  @IsNotEmpty()
  @IsString()
  firstName: string;

  @IsNotEmpty()
  @IsString()
  lastName: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsStrongPassword()
  password: string;

}