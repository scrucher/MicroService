import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-ourse.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseSrvice: CourseService) { }
    
    async CreateCourse(createCourseDto: CreateCourseDto) {
        return await this.courseSrvice.CreateCourse(createCourseDto);
    }

    async GetAllCourses() {
        return await this.courseSrvice.GetAllCourses();
    }

    async GetActiveCourses() {
        return await this.courseSrvice.GetActiveCourses();
    }

    async UpdateCourse(id: string, @Body() createCourseDto: CreateCourseDto) {
        return await this.courseSrvice.UpdateCourse(id, createCourseDto);
    }

    async DeleteCourse( id: string) {
        return await this.courseSrvice.DeleteCourse(id);
    }
}
