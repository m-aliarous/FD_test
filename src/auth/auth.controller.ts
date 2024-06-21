import { Body, Controller, Get, HttpException, HttpStatus, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginUserDto } from 'src/user/dtos/loginUserDto ';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) { }

    @Post()
    async login(@Res() res, @Body() authenticateDto: LoginUserDto) {
        try {
            const response = await this.authService.authenticate(authenticateDto);
            return res.status(HttpStatus.OK).json({ response });;
        } catch (error) {
            throw new HttpException(error.response, error.status || HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @UseGuards(JwtAuthGuard)
    @Get()
    profile(@Req() req, @Res() res) {
        return res.status(HttpStatus.OK).json(req.user);
    }

}
