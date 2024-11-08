import { Controller, Post, Body, UnauthorizedException, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiOperation } from '@nestjs/swagger';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authService: AuthService,
  ) {}

  @ApiOperation({ summary: 'Login user and get the JWT token'})
  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const user = await this.authService.validateUser(loginDto.email, loginDto.password);
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }
    return this.authService.login(user);
  }
}
