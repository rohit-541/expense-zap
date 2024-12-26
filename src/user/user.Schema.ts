import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { HydratedDocument } from "mongoose";

//Create a type corresponding to this class so that it always recieves data of same format
export type UserDoc = HydratedDocument<User>


//Create a schema out of class User
@Schema()
export class User{
    @Prop({required:true})
    name:string;

    @Prop({required:[true,"Email is required"],unique:[true,"Email already exists"]})
    email:string;

    @Prop({required:true,enum:["Male","Female","Other"]})
    gender:string;

    @Prop({required:true})
    password:string;

    @Prop({required:true,minlength:10})
    number:number
}

export const userSchema = SchemaFactory.createForClass(User);