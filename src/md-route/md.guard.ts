import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import {config} from "dotenv";import { JwtService } from '@nestjs/jwt';
import { Prisma } from './../prisma.service';
import { MiddReq } from './../main.types';
 config({
  path : "./../../.env"
})
@Injectable()
export class Mdguard implements CanActivate {
  private jwt : JwtService = new JwtService()
  private prisma : Prisma = new Prisma()
  async canActivate(
    context: ExecutionContext,
  ) {
    const request : Request & MiddReq = context.switchToHttp().getRequest()
    const token = request.header("token")

    if(!token) return false;
    try{
      const decode : {
        id : number
      } = await this.jwt.verify(token , {
        secret : process.env.SECRET
      })
      const findUser = await this.prisma.users.findUnique({
        where :{
            id : decode.id
        }
      })
      const path : string = request.route.path
      if(path.endsWith(":id")){
        const { id } = request.params

        const findMd = await this.prisma.md.findUnique({
            where : {
                id : parseInt(id)
            }
        })
          request.id = findUser.id
        return findMd.usersId == findUser.id || findMd.documentsId == findUser.documentsId || findUser.role == "OWNER" || findUser.role == "ADMIN" ? true : false
      }

      else {
            request.id = findUser.id 

            return true
      }
      
     
    }catch(e){
      return false
    }


     
  }
}


export default Mdguard