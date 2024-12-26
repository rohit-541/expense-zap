import { isNotEmpty, IsNotEmpty } from "class-validator";
import mongoose from "mongoose";

export class expenseDTO{
    
    user:mongoose.Types.ObjectId;

    @IsNotEmpty()
    title:string;

    @IsNotEmpty()
    amount:number;

    @IsNotEmpty()
    categeory:string;

    date:string;
}