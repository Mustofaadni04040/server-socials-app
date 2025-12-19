import { IsEmail, IsNotEmpty } from 'class-validator';

export class SignUpDto {
  @IsNotEmpty({ message: 'Name is required' })
  name: string;
  @IsEmail()
  email: string;
  @IsNotEmpty({ message: 'Password is required' })
  password: string;
}
