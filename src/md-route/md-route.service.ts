import { Injectable } from '@nestjs/common';
import { Request, Response } from 'express';
import { Prisma } from './../prisma.service';
import * as fs from 'fs'
import {join} from 'path';
import { MiddReq } from './../main.types';
@Injectable()
export class MdRouteService {
    private prisma : Prisma = new Prisma()


    async getMd(res : Response , id : string){
        const findMd = await this.prisma.md.findUnique({
            where : {
                id : parseInt(id)
            }
        })
        if(!findMd) return res.status(404).send('md not found!')


        const content = fs.readFileSync(join(process.cwd() + `\\md\\${findMd.filename}`), {
            encoding : "utf-8"
        })


        return res.status(200).json({
            content : content,
            message : "this is content of your file!"
        })
    }

    async updateMd(res : Response , req : MiddReq & Request , id : string , body : {content : string}){
        const findUser = await this.prisma.users.findUnique({
            where : {
                id : req.id
            },
            include : {
                Md : true
            }
        })
        if(findUser.role === "ADMIN" || findUser.role === "OWNER"){
            const findMD = await this.prisma.md.findUnique({
                where : {
                    id : parseInt(id)
                }
            })

            const editFile = fs.readFileSync(join(process.cwd() + `\\md\\${findMD.filename}`),{
                encoding : "utf-8"
            })

            fs.writeFileSync(join(process.cwd() + `\\md\\${findMD.filename}`),body.content)
            return res.status(200).send("file updated!")
        }
        const findMd = findUser.Md.find(md => md.id === parseInt(id))

        if(!findMd) return res.status(404).send("md not found!")
        
        const editFile = fs.readFileSync(join(process.cwd() + `\\md\\${findMd.filename}`),{
            encoding : "utf-8"
        })

        fs.writeFileSync(join(process.cwd() + `\\md\\${findMd.filename}`),body.content)
        return res.status(200).send("file updated!")


    }
}
