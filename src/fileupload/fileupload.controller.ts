import { Controller, FileTypeValidator, MaxFileSizeValidator, ParseFilePipe, Post, Req, UploadedFile, UseGuards, UseInterceptors } from '@nestjs/common';
import { FileuploadService } from './fileupload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { AuthService } from 'src/auth/auth.service';

@Controller('fileupload')
export class FileuploadController {
    constructor(private fileservice:FileuploadService){}

    @UseGuards(AuthService)
    @Post('/upload')
    @UseInterceptors(FileInterceptor('file'))
    async uploadFile(@UploadedFile(
        new ParseFilePipe({
            validators: [
              new MaxFileSizeValidator({ maxSize: 100000 }),//file size should be less that 100kb
              new FileTypeValidator({ fileType: 'image' }),
            ],
          }),
        
    ) file:Express.Multer.File,@Req() req:any){
        const image = file.buffer.toString('base64');
        //we can store this image into database
        const email = req.email;
        console.log(file.size);
        await this.fileservice.addImage(image,email);

        return {
            "message":"Image is saved"
        }
    }   
}
