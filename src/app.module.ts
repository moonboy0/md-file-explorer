import { Module } from '@nestjs/common';
import {config} from "dotenv";import { JwtModule } from '@nestjs/jwt';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { DashboardModule } from './dashboard/dashboard.module';
import { AdminModule } from './admin/admin.module';
import { MdRouteModule } from './md-route/md-route.module';
config({
  path : "./../.env"
})

@Module({
  imports: [JwtModule.register({
    secret : process.env.SECRET ,
    global : true
  }), AuthModule, UploadModule , ServeStaticModule.forRoot({
    rootPath : join(__dirname + "/pfp")
  }), DashboardModule, AdminModule, MdRouteModule],
})
export class AppModule {}
