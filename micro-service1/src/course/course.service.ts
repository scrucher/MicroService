import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CourseDocument } from './course.schema';
import { CreateCourseDto } from './create-ourse.dto';

const logger = new Logger();

@Injectable()
export class CourseService {

    constructor(
        @InjectModel('Course') private readonly courseModel: Model<CourseDocument>,
    ) {
 
    }

    async CreateCourse(createCourseDto: CreateCourseDto, user) {
        logger.log({"data": createCourseDto});
        const { subject, status, data } = createCourseDto;
        logger.log({"data":{subject, status, data }})
        const course = new this.courseModel();
        // course.course_name = course_name;
        course.subject = subject;
        course.status = status;
        course.data = data;
        course.owner = user;
        let saved;
        try {
            saved = await course.save();
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error')
            
        }
        return saved

    }

    async GetAllCourses() {
        let found;
        try {
            found = await this.courseModel.find().populate('owner')
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
        return found;
    }

    async GetActiveCourses() {
        let found;
        try {
            found = await this.courseModel.find({status: true}).populate('owner')
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
        return found;
    }

    async UpdateCourse(id: string, createCourseDto: CreateCourseDto, user) {
        let found;
        try {
            found = await this.courseModel.updateOne({
                _id: id,
                owner: user
            }, createCourseDto);
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
        return found;
    }

    async DeleteCourse(id: string) {
        let found;
        try {
            found = await this.courseModel.deleteOne({_id: id})
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
        return found;
    }
}
