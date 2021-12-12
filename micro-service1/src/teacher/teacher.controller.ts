import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { CreateTeacherDto } from './create-teacher.dto';
import { TeacherService } from './teacher.service';
import { ValidateTeacherDTO } from './validate-teacher.dto';

@Controller('teacher')
export class TeacherController {
    constructor(
        private readonly teacherService: TeacherService,
    ) { }

    @MessagePattern({ role: "items", cmd: "CreateTeacher" })
    async CreateTeacher(createTeacherDto: CreateTeacherDto) {
        return await this.teacherService.CreateTeacher(createTeacherDto);
    }

    async ValidateTeacher(validateTeacherDto: ValidateTeacherDTO) {
        return await this.teacherService.ValidateTeacher(validateTeacherDto);
    }

    async GetTeacherById(id: string) {
        return await this.teacherService.getTeacherById(id);
    }

    async UpdateStudent(id: string, createTeacherDto: CreateTeacherDto) {
        return this.teacherService.UpdateTeacher(id, createTeacherDto);
    }

    async DeleteStudent( id: string) {
        return this.teacherService.DeleteTeacher(id);
    }
}
