import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsString } from 'class-validator';

export class LoginDto {
    @ApiProperty({ example: 'test@email.com', description: 'use email appropritate format' })
    @IsEmail()
    email: string;

    @ApiProperty({ example: 'test123', description: 'The password of the user' })
    @IsString()
    password: string;
}
