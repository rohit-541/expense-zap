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
import { FileuploadService } from './fileupload/fileupload.service';
import { FileuploadController } from './fileupload/fileupload.controller';
import { FileuploadModule } from './fileupload/fileupload.module';

@Module({
  imports: [ConfigModule.forRoot(
    {
      isGlobal:true,
    }
  ),UserModule,MongooseModule.forRoot(process.env.dataBaseURL), AuthModule, ExpenseModule, FileuploadModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
