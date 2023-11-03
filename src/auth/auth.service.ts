import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Prisma } from './../prisma.service';
import * as bcrypt from "bcrypt"
import { Response } from 'express';
import { LoginBody, ResData } from './auth.types';
@Injectable()
export class AuthService {
    private prisma = new Prisma()
    constructor(private jwt : JwtService){}

    async login(res : Response , body : LoginBody){
        let user = await this.prisma.users.findUnique({
            where : {email : body.email}
        })
        
       if(!user) return res.status(401).send("error or password is not valid!")
       
       let compare = await bcrypt.compare(body.password , user.password)

       if(!compare) {
            return res.status(401).send("error or password is not valid!")
       }
       

       const token = this.jwt.sign({id : user.id})
        const data : ResData = {
            message : "everything is okay!",
            token : token
        }
       return res.status(200).json(data)
    }

   
    
}
