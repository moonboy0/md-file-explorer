import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Prisma } from './../prisma.service';

@Module({
  imports : [] ,
  providers: [AuthService],
  controllers: [AuthController]
})
export class AuthModule {}
