import { Body, Controller, Post, Response  as Res} from '@nestjs/common';
import { Response } from 'express';
import { LoginBody } from './auth.types';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
    constructor(private service : AuthService) {} 
    @Post("/login")
    async login(@Res() res : Response , @Body() body : LoginBody){
        this.service.login(res , body)
    }

    
    
}
