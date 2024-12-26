import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { expenseDTO } from './expenseValidation';
import { AuthService } from 'src/auth/auth.service';
import { ExpenseService } from './expense.service';

@Controller('expense')
export class ExpenseController {

    constructor(private expenseService:ExpenseService){}

    @UseGuards(AuthService)
    @Post('/create')
    async createNew(@Body() data:expenseDTO,@Req() req:any){
        if(data.date == null){
            data.date = Date();
        }

        const email:string = req.email;
        const result = await this.expenseService.CreateExpense(data,email);
        return result;
    }

    @UseGuards(AuthService)
    @Get('/')
    async getExpense(@Req() req:any){
        const email = req.email;
        const expenses = await this.expenseService.getExpenses(email);
        return expenses;
    }

    @UseGuards(AuthService)
    @Delete('/:id')
    async deleteExpense(@Param() id:any){
        const result = await this.expenseService.deleteExpense(id.id);
        return {
            msg:"Deleted Successfully"
        }
    }


}
