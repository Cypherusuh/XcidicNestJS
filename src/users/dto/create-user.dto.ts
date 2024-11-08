import { ApiProperty } from "@nestjs/swagger";
import { IsString, IsEmail, IsNotEmpty } from "class-validator";

export class CreateUserDto{
    @IsString()
    @IsNotEmpty({ message: 'Name should not empty' })
    @ApiProperty({ example: 'John doe', description: 'Username' })
    name: string;

    @IsEmail({}, { message: 'Email invalid' })
    @ApiProperty({ example: 'something@email.com', description: 'use email appropritate format' })
    email: string;

    @IsString()
    @IsNotEmpty({ message: 'Password should not empty' })
    @ApiProperty({ example: 'password', description: 'there\'s no limitation on this as long as you remember it'})
    password: string;
}