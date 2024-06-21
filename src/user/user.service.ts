import { HttpException, HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from './entities/user';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dtos/createUserDto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) { }

    async getAllUsers() {
        const users = this.userRepository.find();
        return users;
    }

    async findUserByEmail(email: string): Promise<User | undefined> {
        return await this.userRepository.findOne({
            where: {
                email: email,
            },
        });
    }

    async getUserByEmail(email: string) {
        const user = this.findUserByEmail(email);
        if (user) {
            return user;
        }
        throw new NotFoundException('Could not find the user');
    }


    async getUserById(id: number) {
        const user = await this.userRepository.findOne({
            where: {
                id: id,
            },
        });
        if (user) {
            return user;
        }
        throw new NotFoundException('Could not find the user');
    }


    async createuser(createUserDto?: CreateUserDto) {
        if (!createUserDto) {
            throw new HttpException('createUserDto is undefined', HttpStatus.BAD_REQUEST);
        }
        const { firstName, lastName, email, password } = createUserDto;

        const existingUser = await this.findUserByEmail(email);
        if (existingUser) {
            throw new HttpException('User with this email already exists', HttpStatus.BAD_REQUEST);
        }
        
        const hashedPassword = await bcrypt.hash(password, 10); //hashing the password
        const newuser = await this.userRepository.create({ firstName, lastName, email, hashedPassword });
        await this.userRepository.save(newuser);
        return newuser;
    }
}
