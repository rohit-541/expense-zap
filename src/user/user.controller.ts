import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, UnauthorizedException, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { UserDoc } from './user.Schema';
import { hashPassword } from './hashedpassword';
import mongoose, { MongooseError } from 'mongoose';
import { loginDTO, RegisterUserDTO } from './user.data.validation';
import { JwtService } from '@nestjs/jwt';

@Controller('user')
export class UserController {
    constructor(private UserService:UserService,
        private jwtService: JwtService
    ){}

    //All Get requests
    @Get('/')
    Hello(){
        return "Hello"
    }


    //All Post requests

    //Register new User
    @Post('/register')
    @UsePipes(new ValidationPipe())
    async registerUser(@Body() data:RegisterUserDTO){

        try {
            const {name,email,password,gender,number} = data;
            //currently assuming email is a existing email
            //get the hashed password
            const hashedPassword:string = await hashPassword(password);
            
            const result = await this.UserService.registerUser(name,email,hashedPassword,gender,number);
            
            return result;
        } catch (error) {
            if(error instanceof MongooseError){
                throw new BadRequestException(error.message);
            }
            
            throw new InternalServerErrorException("Internal Server Error");
        }
    }

    @Post('/login')
    @UsePipes(new ValidationPipe())
    async loginUser(@Body() data:loginDTO){

        try {
            const {email,password} = data;

        //confirm the login 
        const result = this.UserService.login(email,password);
        if(!result){
            throw new UnauthorizedException("Invalid Credentials");
        }

        //Genrate token and send to user
        const payload = {
            email:email
        }

        const token:string = await this.jwtService.signAsync(payload,{
            secret:process.env.SECRETKEY,
            expiresIn:'1h'
        });
        return token;
        } catch (error) {
            throw error;
        }        
    }
}
