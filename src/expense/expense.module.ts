import { Module } from '@nestjs/common';
import { ExpenseService } from './expense.service';
import { ExpenseController } from './expense.controller';
import { Mongoose } from 'mongoose';
import { MongooseModule, Schema } from '@nestjs/mongoose';
import { Expense, ExpenseSchema } from './expenseSchema';
import { UserModule } from 'src/user/user.module';
import { User, userSchema } from 'src/user/user.Schema';

@Module({
  imports:[MongooseModule.forFeature([{name:Expense.name,schema:ExpenseSchema},{name:User.name,schema:userSchema}])],
  providers: [ExpenseService],
  controllers: [ExpenseController]
})
export class ExpenseModule {}
