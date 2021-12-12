import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

export type TeacherDocument = Document & Teacher;
@Schema({timestamps: true, autoIndex: true})
export class Teacher {
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
 export const TeacherSchema = SchemaFactory.createForClass(Teacher)
