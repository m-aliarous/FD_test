import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProductModule } from './product/product.module';
import { UserModule } from './user/user.module';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { JwtStrategy } from './auth/jwt.strategy';

@Module({
  imports: [ConfigModule.forRoot({
    isGlobal: true,
    load: [configuration],
  }),
  TypeOrmModule.forRootAsync({
    imports: [ConfigModule],
    useFactory: (configService: ConfigService) => configService.get('database'),
    inject: [ConfigService],
  }),
  ProductModule,
  UserModule,
  PassportModule,
  JwtModule.register({ secret: 'secrete', signOptions: { expiresIn: '1h' } }),
  AuthModule,],
  controllers: [AppController],
  providers: [AppService,JwtStrategy],
})
export class AppModule {}
