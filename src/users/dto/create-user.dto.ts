import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty({ message: 'Name should not empty' })
    name: string;

    @IsEmail({}, { message: 'Email invalid' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not empty' })
    password: string;
}