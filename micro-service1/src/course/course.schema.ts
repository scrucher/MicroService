import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document, Types } from "mongoose";
import { Teacher } from "src/teacher/teacher.schema";
export type CourseDocument = Document & Course;
@Schema({ timestamps: true, autoIndex: true })
export class Course {


    @Prop({
        type: Array,
    })
    subject: string;

    @Prop()
    course_name: string;

    @Prop()
    data: string

    @Prop({
        default: false,
    })
    status: boolean;


    @Prop({ type: Types.ObjectId, ref: 'Teacher' })
    owner: Teacher;
    // @Prop({ type: Types.ObjectId, ref: 'Owner' })
    // Course: Course[];


}
export const CourseSchema = SchemaFactory.createForClass(Course)
