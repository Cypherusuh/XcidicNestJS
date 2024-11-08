import { Body, Controller, Get, Post, Query, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';
import { User } from './users.entity';
import { CreateUserDto } from './dto/create-user.dto';
import { JwtAuthGuard } from 'src/auth/guards/jwt.guard';
import { CurrentUser } from 'src/auth/current-user.decorator';
import { ApiBearerAuth, ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
    constructor(private readonly userService: UsersService) { }

    @ApiOperation({ summary: 'Get User data'})
    @Get()
    async findAll(
        @Query('page') page: string = '1',
        @Query('limit') limit: string = '10',
    ): Promise<{ data: User[]; total: number; page: number; limit: number }> {
        // Convert page and limit to numbers
        const pageNumber = Number(page);
        const limitNumber = Number(limit);

        // Pass the converted numbers to the service
        return await this.userService.findAll(pageNumber, limitNumber);
    }

    @ApiOperation({ summary: 'Create new User data'})
    @Post()
    async create(@Body() createUserDto: CreateUserDto) {
        return this.userService.create(createUserDto);
    }

    @ApiOperation({ summary: 'Get current user using Bearer Token'})
    @ApiBearerAuth()
    @UseGuards(JwtAuthGuard)
    @Get('profile')
    getProfile(@CurrentUser() user: User) {
        return this.userService.findById(user.id);
    }
}
