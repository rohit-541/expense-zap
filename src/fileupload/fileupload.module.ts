import { Module } from '@nestjs/common';
import { FileuploadController } from './fileupload.controller';
import { FileuploadService } from './fileupload.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Image, imageSchema } from './imageSchema';

@Module({
    imports:[MongooseModule.forFeature([{name:Image.name,schema:imageSchema}])],
    controllers:[FileuploadController],
    providers:[FileuploadService]
})
export class FileuploadModule {}
