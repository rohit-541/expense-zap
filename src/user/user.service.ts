import { BadRequestException, Injectable, InternalServerErrorException, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import mongoose, { Model, MongooseError } from 'mongoose';
import { User, UserDoc } from './user.Schema';
import { checkPass } from './hashedpassword';

@Injectable()
export class UserService {
    //create usermodal
    constructor(@InjectModel(User.name) private UserModel:Model<User>){}

    //Register new User in database
    async registerUser(name:string,email:string,passord:string,gender:string,number:number){
        //create new user
        
        const newUser:UserDoc = new this.UserModel({
            name:name,
            email:email,
            password:passord,
            gender:gender,
            number:number
        });
        await newUser.save();
        return newUser;
    }

    //Login user
    async login(email:string,password:string){
        const user = await this.UserModel.findOne({email:email});
        if(!User){
            return false;
        }

        //compare password
        const hashedpass:string = user.password;
        return await checkPass(hashedpass,password);
    }
}
