import {  Injectable } from '@nestjs/common';
import { AuthGuard } from './../main.guard';
import { Request, Response } from 'express';
import { Prisma } from './../prisma.service';
import { MiddReq } from './../main.types';

@Injectable()
export class UploadService {
    private prisma = new Prisma()
    async uploadPfp(res : Response   , req : Request & MiddReq, pfp : Express.Multer.File){
        try{
            const createPfp = await this.prisma.pfp.create({
                data : {
                    name : pfp.filename,
                    usersId : req.id
                }
            })
    
    
    
            return res.status(200).json(createPfp)
        }catch(e){
            return res.status(400).send(e)
        }
    }


    async uploadMD(res : Response   , req : Request & MiddReq, file : Express.Multer.File , body : {
        name : string
    }){
        const findUser = await this.prisma.users.findUnique({
            where :{ 
                id : req.id
            }
        })


        const craeteMd = await this.prisma.md.create({
            data : {
                filename : file.filename,
                name : body.name,
                usersId : findUser.id,
                documentsId : findUser.documentsId
            }
        }
        )

        return res.status(200).json(craeteMd)
    }
}
