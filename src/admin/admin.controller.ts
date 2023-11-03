import { Controller, Get, UseGuards , Response as Res , Request as Req , Param, Post, Body, Patch} from '@nestjs/common';
import { AdminGuard } from './admin.guard';
import {} from "express"
import { AdminService } from './admin.service';
@Controller('admin')
// @UseGuards(AdminGuard)
export class AdminController {
    constructor(private service : AdminService){}
    @Get("/users")
    async  getUsers(@Res() res , @Req() req){
        await this.service.getUsers(res , req)
    }
    @Get("/users/:id")
    async getOneUser(@Res() res , @Req() req , @Param("id") id){
        await this.service.getOneUser(res , req , id)
    }


    @Post("/users")
    async createUser(@Res() res, @Req() req , @Body() body : {email : string , password : string , name : string , documentId : string}){
        await this.service.createUser(res , req , body)
    }

    @Post("/document")
    async createDocument(@Res() res , @Req() req , @Body() body : {name : string}){
        await this.service.createDocument(res , req , body)
    }

    // @Patch("/users/:id/document")
    // async editUserDocument(@Req() req , @Res() res , @Body() body : {id : number} , @Param("id") id ){
    //     return await this.service.editUserDocument(res , req  , body , id)
    // }
}
