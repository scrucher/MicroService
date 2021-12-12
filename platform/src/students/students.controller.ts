import { Body, Controller, Delete, Get, Logger, Param, Patch, Post } from '@nestjs/common';
import { CreatestudentsDto } from './createstudents-dto.interface';
import { StudentsService } from './students.service';
import { ValidateUserDTO } from './validate-user.dto';

const logger = new Logger();
@Controller('students')
export class StudentsController {
    constructor(
        private readonly studentsService: StudentsService,
    ) { }
    
    @Post('/signup')
    async CreateStudent(@Body() createStudentDto: CreatestudentsDto) {
        logger.log({ "DTO_1": createStudentDto });
        return await this.studentsService.CreateStudent(createStudentDto);
    }

    @Post('login')
    async ValidateStudent(@Body() validateUserDto: ValidateUserDTO) {
        return await this.studentsService.ValidateStudent(validateUserDto);
    }

    @Get()
    async GetStudentById(@Param() id: string) {
        return await this.studentsService.getStudentById(id);
    }

    @Patch()
    async UpdateStudent(@Param() id: string, @Body() createStudenDto: CreatestudentsDto) {
        return this.studentsService.UpdateStudent(id, createStudenDto);
    }

    @Delete()
    async DeleteStudent(@Param() id: string) {
        return this.studentsService.DeleteStudent(id);
    }

}
