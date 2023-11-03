import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import { MiddReq } from './main.types';
import { JwtService } from '@nestjs/jwt';
import {config} from "dotenv";config({
  path : "./../.env"
})
@Injectable()
export class AuthGuard implements CanActivate {
    private jwt = new JwtService()
  async canActivate(
    context: ExecutionContext,
  ){
    const request : Request & MiddReq  = context.switchToHttp().getRequest();
   const token =  request.header("token")
   if(!token) return false 

   try{
    const decode = await this.jwt.verify(token, {
      secret : process.env.SECRET
    })
    request.id = decode.id 


    return true


   }catch(e){
    return false
   }
  }
}