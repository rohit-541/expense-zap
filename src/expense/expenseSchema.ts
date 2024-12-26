import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Expense{

    @Prop({type:mongoose.Types.ObjectId,ref:'User'})
    user:mongoose.Types.ObjectId

    @Prop({required:true})
    title:string

    @Prop({required:true})
    amount:number

    //Provide date
    @Prop({default:Date()})
    date:string

    //used to filter
    //We can store date as Date.now() format and can change it to dd/mm/yyyy later but for our visual purpose we will now use this schema
    @Prop({default:Date.now()})
    dateCreated:Date

    @Prop({required:true})
    categeory:string
}


export const ExpenseSchema = SchemaFactory.createForClass(Expense);
