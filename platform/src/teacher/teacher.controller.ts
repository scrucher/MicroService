import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CreateTeacherDto } from './create-teacher.dto';
import { TeacherService } from './teacher.service';
import { ValidateTeacherDTO } from './validate-teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService,
    ) { }

    @Post('/signup')
    async CreateTeacher(@Body() createTeacherDto: CreateTeacherDto) {
        return await this.teacherService.CreateTeacher(createTeacherDto);
    }

    @Post('login')
    async ValidateTeacher(@Body() validateTeacherDto: ValidateTeacherDTO) {
        return await this.teacherService.ValidateTeacher(validateTeacherDto);
    }

    @Get()
    async GetTeacherById(@Param() id: string) {
        return await this.teacherService.getTeacherById(id);
    }

    @Patch()
    async UpdateStudent(@Param() id: string, @Body() createTeacherDto: CreateTeacherDto) {
        return this.teacherService.UpdateTeacher(id, createTeacherDto);
    }

    @Delete()
    async DeleteStudent(@Param() id: string) {
        return this.teacherService.DeleteTeacher(id);
    }
}
