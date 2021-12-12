import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type StudentsDocument = Document & Students;
@Schema({timestamps: true, autoIndex: true})
export class Students {
    @Prop()
    username: string;
    @Prop()
    full_name: string;
    @Prop()
    email: string;
    @Prop()
    salt: string;
    @Prop()
    password: string;
    
}
 export const StudentsSchema = SchemaFactory.createForClass(Students)
