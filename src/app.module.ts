import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserController } from './user/user.controller';
import { UserService } from './user/user.service';
import { UserModule } from './user/user.module';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [UserModule,MongooseModule.forRoot('mongodb://localhost:27017/ExpenseZap'),ConfigModule.forRoot(
    {
      isGlobal:true,
    }
  )],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
