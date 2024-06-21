import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dtos/createUserDto';
import User from './entities/user';

@Controller('user')
export class UserController {

    constructor(private readonly userService: UserService) {}
    
    @Post()
    async createUser(@Body() createUserDto: CreateUserDto) {
      const newUser = await this.userService.createuser(createUserDto);
      return newUser;
    }
    @Get()
    async getAllUsers(): Promise<User[]> {
        const users = await this.userService.getAllUsers();
        return users;
      }
}
