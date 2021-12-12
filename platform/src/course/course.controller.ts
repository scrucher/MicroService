import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CourseService } from './course.service';
import { CreateCourseDto } from './create-ourse.dto';

@Controller('courses')
export class CoursesController {
    constructor(private readonly courseSrvice: CourseService) { }
    
    @Post()
    async CreateCourse(@Body() createCourseDto: CreateCourseDto) {
        return await this.courseSrvice.CreateCourse(createCourseDto);
    }

    @Get()
    async GetAllCourses() {
        return await this.courseSrvice.GetAllCourses();
    }

    @Get()
    async GetActiveCourses() {
        return await this.courseSrvice.GetActiveCourses();
    }

    @Patch('/:id')
    async UpdateCourse(@Param() id: string, @Body() createCourseDto: CreateCourseDto) {
        return await this.courseSrvice.UpdateCourse(id, createCourseDto);
    }

    @Delete('/:id')
    async DeleteCourse(@Param() id: string) {
        return await this.courseSrvice.DeleteCourse(id);
    }
}
