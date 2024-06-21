import { Injectable, NotFoundException } from '@nestjs/common';
import { sign } from 'jsonwebtoken';
import { LoginUserDto } from 'src/user/dtos/loginUserDto ';
import { UserService } from 'src/user/user.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private readonly userService: UserService) { } 

    async authenticate(authenticateDto: LoginUserDto) {
        const user = await this.userService.findUserByEmail(authenticateDto.email);
        if (!user)  throw new NotFoundException('Invalid credentials');
        const isMatch = await bcrypt.compare(authenticateDto.password, user.hashedPassword);
        if (!isMatch)  throw new NotFoundException('Invalid credentials');
        const token = sign({ ...user }, 'secrete');
        return {token};
    }
}
