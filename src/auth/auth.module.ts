import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import User from 'src/user/entities/user';
import { UserService } from 'src/user/user.service';

@Module({
  imports: [TypeOrmModule.forFeature([User])], 
  providers: [AuthService, UserService],
  controllers: [AuthController]
})
export class AuthModule {}
