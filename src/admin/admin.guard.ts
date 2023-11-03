import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import {config} from "dotenv";import { JwtService } from '@nestjs/jwt';
import { Prisma } from './../prisma.service';
import { MiddReq } from './../main.types';
 config({
  path : "./../../.env"
})
@Injectable()
export class AdminGuard implements CanActivate {
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
        where  : {
          id : decode.id
        }
      })
      const role = findUser.role as "ADMIN" | "OWNER" | "MEMBER"
      if(role == "ADMIN"){
        request.id = findUser.id
        return true
      }

      else if(role == "OWNER"){
        request.id = findUser.id
        return true
      }


      else return false
    }catch(e){
      return false
    }


     
  }
}
