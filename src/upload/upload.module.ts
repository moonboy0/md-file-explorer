import { Module } from '@nestjs/common';
import { UploadController } from './upload.controller';
import { UploadService } from './upload.service';
import {MulterModule} from "@nestjs/platform-express"
import { storage } from './disk';
@Module({
  imports : [MulterModule.register({
    dest : process.cwd() + "\\pfp\\",
    storage : storage
  })] ,
  controllers: [UploadController],
  providers: [UploadService]
})
export class UploadModule {}
