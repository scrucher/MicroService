import { Injectable, InternalServerErrorException, Logger, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatestudentsDto } from './createstudents-dto.interface';
import { StudentsDocument } from './students.schema';
import * as bcrypt from 'bcrypt';
import { ValidateUserDTO } from './validate-user.dto';
import { JwtService } from '@nestjs/jwt';

const logger = new Logger();


@Injectable()
export class StudentsService {
    constructor(
        @InjectModel('Students') private readonly studentsModel: Model<StudentsDocument>,
        private readonly jwtService: JwtService,


    ) {}


    async CreateStudent(createStudentsDto: CreatestudentsDto) {
        const { username,
            full_name,
            email,
            password
        } = createStudentsDto;
        const student = new this.studentsModel();
        student.username = username;
        student.full_name = full_name;
        student.email = email;
        const salt = await bcrypt.genSaltSync(10)
        student.salt = salt;
        student.password = await bcrypt.hashSync(password, student.salt);
        logger.log({
            "DTO": createStudentsDto,
        })

        var saved;
        try {
            saved = await this.studentsModel.create(student);
        } catch (err) {
            throw new InternalServerErrorException("Internal Server Error")
        }
        logger.log(saved)
        return saved

    }
    async ValidateStudent(validateStudentDto: ValidateUserDTO) {
        const { username, password } = validateStudentDto;
        logger.log(validateStudentDto)
        let found;
        try {
            found = await this.studentsModel.findOne({ username: username });
        } catch (err) {
            throw new NotFoundException("Account Do Not Exist");
        }
        logger.log(found);
        const pwd = bcrypt.hashSync(password, found.salt)
        let token;
        if (found && found.password === pwd) {
            token = this.jwtService.sign(found.username);
            logger.log(token)
        }
        return token;

    }

    async UpdateStudent(id: string, createStudentsDto: CreatestudentsDto) {
        let updated;
        try {
            updated = await this.studentsModel.updateOne({_id: id}, createStudentsDto)
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async DeleteStudent(id: string) {
        try {
            await this.studentsModel.deleteOne({_id: id});
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getStudentById(id: string) {
        let found;
        try {
            found = await this.studentsModel.findOne({ _id: id });
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

}
