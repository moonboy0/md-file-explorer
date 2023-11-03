import { Controller, UseGuards, Request as Req, Response as Res, Post , UseInterceptors, UploadedFile, Body } from '@nestjs/common';

import { AuthGuard } from './../main.guard';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request, Response } from 'express';
import { MiddReq } from './../main.types';
import { UploadService } from './upload.service';

@Controller('upload')
@UseGuards(AuthGuard)
export class UploadController {
    constructor(private service : UploadService){}
    @Post("/pfp")
    @UseInterceptors(FileInterceptor('pfp'))
    async uploadPfp(@UploadedFile() file : Express.Multer.File , @Req() req : Request & MiddReq , @Res() res : Response ){
        if(!file.originalname.endsWith(".jpg") || !file.originalname.endsWith(".png")){
            return res.status(401).send('file doesnt supported!')
        }
        await this.service.uploadPfp(res, req, file)
    }


    @Post("/md")
    @UseInterceptors(FileInterceptor('md'))
    async uploadMD(@UploadedFile() file : Express.Multer.File , @Req() req : Request & MiddReq , @Res() res : Response  , @Body() body : {name : string}){
        console.log(file);
        await this.service.uploadMD(res, req, file , body)
    }

}
