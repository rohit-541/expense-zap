import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';
import { AuthService } from './auth/auth.service';
import { AuthController } from './auth/auth.controller';
import { AuthModule } from './auth/auth.module';
import { ExpenseModule } from './expense/expense.module';

@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://localhost:27017/ExpenseZap'),ConfigModule.forRoot(
    {
      isGlobal:true,
    }
  ), AuthModule, ExpenseModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
