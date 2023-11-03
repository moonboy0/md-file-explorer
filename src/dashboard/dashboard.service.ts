import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { MiddReq } from './../main.types';
import { Prisma } from './../prisma.service';
import {compare,genSalt, hash} from "bcrypt"
@Injectable()
export class DashboardService {
    private prisma = new Prisma()



    async me(res : Response  , req : Request & MiddReq  ){
        const findUser = await this.prisma.users.findUnique({
            where : {
                id : req.id
            }
            
        })


        const findPfp = await this.prisma.pfp.findMany({
            where : {
                usersId : req.id
            }
        })

        if(findPfp.length === 0){
            return res.status(200).json({
                name : findUser.name , 
                email : findUser.email,
                id : findUser.id ,
                role : findUser.role,
                pfpId : null
            })
        }
        const last = findPfp[findPfp.length-1]


        return res.status(200).json({
            name : findUser.name , 
            email : findUser.email,
            id : findUser.id ,
            role : findUser.role,
            pfpName : last.name
        })
        
    }


    async changePassword(res : Response  , req : Request & MiddReq , body : {oldPassword : string , newPassword : string} ){
        const findUser = await this.prisma.users.findUnique({
            where : {
                id : req.id
            }
        })

        let isMatch = await compare(body.oldPassword , findUser.password)

        if(!isMatch) return res.status(401).send("password doesnt match!")
        const salt = await genSalt(8)

        const upadateUser = await this.prisma.users.update({
            where: {
                id : req.id
            },
            data : {
                password : await hash(body.newPassword , salt)
            }
        })

        return res.status(200).send("password successfully changed")
    }
    
}
