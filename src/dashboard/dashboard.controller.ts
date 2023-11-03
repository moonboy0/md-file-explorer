import { Controller, Post, UseGuards , Response as Res , Request as Req, Get , Patch , Body} from '@nestjs/common';
import { AuthGuard } from './../main.guard';
import { DashboardService } from './dashboard.service';
import { Request, Response } from 'express';
import { MiddReq } from './../main.types';

@Controller('dashboard')
@UseGuards(AuthGuard)
export class DashboardController {
    constructor(private service : DashboardService){}


    @Get("/me")
    async me(@Req() req : Request &  MiddReq , @Res() res : Response){
        await this.service.me(res  , req)
    }


    @Patch("/password")
    async changePassword(
        @Req() req : Request & MiddReq , 
        @Res() res : Response , 
        @Body() body : {oldPassword : string , newPassword : string} ){
        this.service.changePassword(res , req , body)
    }
}
