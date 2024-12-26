import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Image } from './imageSchema';
import { Model } from 'mongoose';

@Injectable()
export class FileuploadService {
    constructor(@InjectModel(Image.name) private ImageModel:Model<Image>){}
    async addImage(image:string,email:string){
        const newImage = new this.ImageModel({
            user:email,
            image:image
        })

        await newImage.save();
    }
}
