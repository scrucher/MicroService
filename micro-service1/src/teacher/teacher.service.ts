import { Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Model } from 'mongoose';
import { CreateTeacherDto } from './create-teacher.dto';
import { ValidateTeacherDTO } from './validate-teacher.dto';
import * as bcrypt from 'bcrypt';
import { InjectModel } from '@nestjs/mongoose';
import { TeacherDocument } from './teacher.schema';

@Injectable()
export class TeacherService {
    constructor(
        @InjectModel('Teacher') private readonly teacherModel: Model<TeacherDocument>,
        private readonly jwtService: JwtService,
    ){}

    async CreateTeacher(createTeacherDto: CreateTeacherDto) {
        const { username,
            full_name,
            email,
            password
        } = createTeacherDto;
        const teacher = new this.teacherModel();
        teacher.username = username;
        teacher.full_name = full_name;
        teacher.email = email;
        const salt = await bcrypt.genSaltSync(10)
        teacher.salt = salt;
        teacher.password = await bcrypt.hashSync(password, teacher.salt);

        var saved;
        try {
            saved = await this.teacherModel.create(teacher);
        } catch (err) {
            throw new InternalServerErrorException("Internal Server Error")
        }
        return saved
    }

    async ValidateTeacher(validateTeacherDto: ValidateTeacherDTO) {
        const { username, password } = validateTeacherDto;
        let found;
        try {
            found = await this.teacherModel.findOne({ username: username });
        } catch (err) {
            throw new NotFoundException("Account Do Not Exist");
        }
        const pwd = bcrypt.hashSync(password, found.salt)
        let token;
        if (found && found.password === pwd) {
            token = this.jwtService.sign(found.username);
        }
        return token;
    }

    async UpdateTeacher(id: string, createTeacherDto: CreateTeacherDto) {
        let updated;
        try {
            updated = await this.teacherModel.updateOne({ _id: id }, createTeacherDto)
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async DeleteTeacher(id: string) {
        try {
            await this.teacherModel.deleteOne({ _id: id });
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }

    async getTeacherById(id: string) {
        let found;
        try {
            found = await this.teacherModel.findOne({ _id: id });
        } catch (err) {
            throw new InternalServerErrorException('Internal Server Error');
        }
    }
}
