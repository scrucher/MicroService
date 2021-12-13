import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Students } from "src/students/students.schema";



export type ClassroomDocument = Document & Classroom;

@Schema({ timestamps: true, autoIndex: true })
export class Classroom {
    @Prop()
    class_name: string;
    @Prop({
        type: Array,
    })
    subject: string[];
    @Prop({ type: Types.ObjectId, ref: 'Owner' })
    students: Students[];
    // @Prop({ type: Types.ObjectId, ref: 'Owner' })
    // Classroom: Classroom[];


}
export const ClassroomSchema = SchemaFactory.createForClass(Classroom)
