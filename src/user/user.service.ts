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
        console.log(user);
        if(!user){
            return false;
        }

        //compare password
        const hashedpass:string = user.password;
        console.log("user",user);
        return await checkPass(hashedpass,password);
    }

    async userDetails(userEmail:string){
        const user = await this.UserModel.findOne({email:userEmail}).select('-password ');
        if(!user){
            throw new BadRequestException("User not found");
        }

        return user;
    }

    async update(data:any,email:string){
        const user = await this.UserModel.findOne({email:email});
        if(!user){
            throw new UnauthorizedException("User not found");
        }

        if(data.name){
            user.name = data.name;
        }

        if(data.number){
            user.number = data.number;
        }

        if(data.gender){
            user.gender = data.gender;
        }
        
        const updatedUser = await user.save();
        return updatedUser;
    }
}
