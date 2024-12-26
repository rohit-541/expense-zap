import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Expense } from './expenseSchema';
import { Model } from 'mongoose';
import { expenseDTO } from './expenseValidation';
import { User } from 'src/user/user.Schema';

@Injectable()
export class ExpenseService {
    constructor(@InjectModel(Expense.name) private ExpenseModel:Model<Expense>,
@InjectModel(User.name) private userModel:Model<User>){}

    async CreateExpense(data:any,email:string){

        const user = await this.userModel.findOne({email:email});
        if(!user){
            throw new UnauthorizedException("User not found");
        }
        data.user = user._id;
        const newExpense = new this.ExpenseModel(data);
        await newExpense.save();
        return newExpense;
    }

    async getExpenses(email:string){
        const user = await this.userModel.findOne({email:email});
        if(!user){
            throw new UnauthorizedException("Unauthorized");
        }

        const expenses = await this.ExpenseModel.find({user:user._id}).select('_id title amount date categeory');

        return expenses;
    }

    async deleteExpense(id:string){
        const result = await this.ExpenseModel.findByIdAndDelete(id);
        return result;
    }
}
