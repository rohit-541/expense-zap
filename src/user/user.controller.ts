import { BadRequestException, Body, Controller, Get, InternalServerErrorException, Post, Req, UnauthorizedException, UseGuards, UsePipes, ValidationPipe } from '@nestjs/common';
import { UserService } from './user.service';
import { hashPassword } from './hashedpassword';
import { MongooseError } from 'mongoose';
import { loginDTO, RegisterUserDTO } from './user.data.validation';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from 'src/auth/auth.service';

@Controller('user')
export class UserController {
    constructor(private UserService:UserService,
        private jwtService: JwtService
    ){}

    //All Get requests
    @UseGuards(AuthService)
    @Get('/')
    async userDetails(@Req() req:any){
        const userEmail = req.email;
        try {
            const result = await this.UserService.userDetails(userEmail);
            return result;
        } catch (error) {
            throw error;
        }
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

    @UseGuards(AuthService)
    @Post('/update')
    async update(@Body() data:any,@Req() req:any){
        const email:string = req.email;
        try {
            const updatedUser = await this.UserService.update(data,email);
            return updatedUser;
        } catch (error) {
            throw error;
        }

    }

    @UseGuards(AuthService)
    @Post('/resetPassword')
    async resetPassword(@Req() req:any){
        const email:string = req.email;

        
    }
}
