import { Injectable } from '@nestjs/common';
import { Prisma } from './../prisma.service';
import { Users } from '@prisma/client';
import { Response , Request} from "express"
import * as bcrypt from 'bcrypt'
@Injectable()
export class AdminService {
    private prisma : Prisma  = new Prisma()


    async  getUsers(res : Response , req : Request) {
        const users = await this.prisma.users.findMany({
            select : {
                email : true ,
                id : true ,
                name : true ,
                role : true ,
                Pfp : true ,
                Md : true
            },
            
        })


        res.status(200).json( {users : users})
    }


    async getOneUser(res : Response , req : Request , id : string) {
        
        const user = await this.prisma.users.findUnique({
            where : {
                id : parseInt(id)
            },
            select : {
                name : true ,
                email : true , 
                role : true ,
                Md : true, 
                Pfp : true
            }
        })

        if(user === null) return res.status(404).send('user not found!')


        res.status(200).json({user : user})
    } 


    async createUser(res : Response , req : Request , body : {
        email : string ,
        password : string ,
        name : string ,
        documentId : string
    }){
        const findUser = await this.prisma.users.findUnique({
            where : {
                email : body.email
            }
        })
        if(findUser) return res.status(400).send('user already registerd!')

        const salt = await bcrypt.genSalt(8)
        const encryptedPass = await bcrypt.hash(body.password , salt)
        const newUser = await this.prisma.users.create({
           data : {
            email : body.email , 
            name : body.name ,
            documentsId : parseInt(body.documentId),
            password : encryptedPass
           }  
        })


        return res.status(200).send("user successfully created!")
    }
    async createDocument(res : Response , req : Request , body : {name : string}){
        const createDocument = await this.prisma.documents.create({
            data : {
                name : body.name
            },
            
        })

        return res.status(200).json(createDocument)
    }
    
}
