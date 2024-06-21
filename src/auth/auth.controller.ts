import { Body, Controller, Get, HttpStatus, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dtos/loginUserDto ';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}

    @Post()
    async login(@Res() res, @Body() authenticateDto: LoginUserDto) {
      try {
        const response = await this.authService.authenticate(authenticateDto);
        return res.status(HttpStatus.OK).json({ response });
      } catch (error) {
        return res.status(error.status).json(error.response);
      }
    }
  


  }
