import { Controller, Param, Response  , Patch , Request as Req , Body} from '@nestjs/common';
import {Get , UseGuards} from "@nestjs/common"
import Mdguard from './md.guard';
import { MdRouteService } from './md-route.service';
import { Request } from 'express';
import { MiddReq } from './../main.types';
@Controller('md')
@UseGuards(Mdguard)
export class MdRouteController {
    constructor(private service : MdRouteService){}
    @Get("/:id")
    async getMd(@Response() res , @Param("id") id : string){
        await this.service.getMd(res , id)
    }

    @Patch("/:id")
    async updateMd(@Req() req : Request & MiddReq, @Response() res , @Param("id") id : string , @Body() body : {content : string}){
        await this.service.updateMd(res , req,id,body)
    }
}
