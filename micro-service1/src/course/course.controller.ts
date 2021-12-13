import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { Ctx, MessagePattern, RedisContext } from '@nestjs/microservices';
import { User } from 'src/user.decorator';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-ourse.dto';

const logger = new Logger();

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseSrvice: CourseService) { }
    
    @MessagePattern({ role: "items", cmd: "CreateCourse"})
    async CreateCourse(createCourseDto: CreateCourseDto, @User() user) {
        logger.log({"data": createCourseDto})
        return await this.courseSrvice.CreateCourse(createCourseDto, user);
    }

    async GetAllCourses() {
        return await this.courseSrvice.GetAllCourses();
    }

    async GetActiveCourses() {
        return await this.courseSrvice.GetActiveCourses();
    }

    async UpdateCourse(@Param()id: string, @Body() createCourseDto: CreateCourseDto, @User()user) {
        return await this.courseSrvice.UpdateCourse(id, createCourseDto, user);
    }

    async DeleteCourse( id: string) {
        return await this.courseSrvice.DeleteCourse(id);
    }
}
