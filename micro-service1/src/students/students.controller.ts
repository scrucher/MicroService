import { Body, Controller, Get, Logger, Post } from '@nestjs/common';
import { EventPattern, MessagePattern } from '@nestjs/microservices';
import { CreatestudentsDto } from './createstudents-dto.interface';
import { StudentsService } from './students.service';
import { ValidateUserDTO } from './validate-user.dto';

const logger = new Logger();
@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ) { }
    
    @MessagePattern({role: "items", cmd:"CreateStudent"})
    async CreateStudent(createStudentDto: CreatestudentsDto) {
        logger.log({ "DTO_1": createStudentDto });
        return await this.studentsService.CreateStudent(createStudentDto);
    }

    @MessagePattern({ role: "items", cmd: "ValidateStudent" })
    async ValidateStudent(validateUserDto: ValidateUserDTO) {
        return await this.studentsService.ValidateStudent(validateUserDto);
    }

    @MessagePattern({ role: "items", cmd: "GetStudenstById" })
    async GetStudentById( id: string) {
        return await this.studentsService.getStudentById(id);
    }

    @MessagePattern({ role: "items", cmd: "UpdateStudent" })
    async UpdateStudent( id: string, @Body() createStudenDto: CreatestudentsDto) {
        return this.studentsService.UpdateStudent(id, createStudenDto);
    }

    @MessagePattern({ role: "items", cmd: "DeleteStudent" })
    async DeleteStudent( id: string) {
        return this.studentsService.DeleteStudent(id);
    }


}
