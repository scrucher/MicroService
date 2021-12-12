import { Injectable } from '@nestjs/common';
import { CreateCourseDto } from './create-ourse.dto';

@Injectable()
export class CourseService {

    constructor() {
 
    }

    async CreateCourse(createCourseDto: CreateCourseDto) {
    }

    async GetAllCourses() {
    }

    async GetActiveCourses() {
    }

    async UpdateCourse(id: string, createCourseDto: CreateCourseDto) {
    }

    async DeleteCourse(id: string) {
    }
}
