import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { User, userSchema } from './user.Schema';
import { UserController } from './user.controller';
import { UserService } from './user.service';
import { JwtModule } from '@nestjs/jwt';

@Module({
    imports:[MongooseModule.forFeature([{name:User.name,schema:userSchema}]),JwtModule.register({
        global:true,
    })],
    controllers:[UserController],
    providers:[UserService]

})
export class UserModule {}


