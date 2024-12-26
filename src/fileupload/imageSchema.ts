import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";

@Schema()
export class Image{
    @Prop({type:mongoose.Types.ObjectId,ref:'User'})
    user:mongoose.Types.ObjectId

    @Prop()
    image:string
}

export const imageSchema = SchemaFactory.createForClass(Image);