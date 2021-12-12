import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateTeacherDto } from './create-teacher.dto';
import { ValidateTeacherDTO } from './validate-teacher.dto';

@Injectable()
export class TeacherService {
    private client: ClientProxy;
    constructor(

    ) {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379',
            }
        })
    }


    async CreateTeacher(createTeacherDto: CreateTeacherDto) {
        // await this.client.connect();
        return await this.client.send({ role: "items", cmd: 'CreateTeacher' }, createTeacherDto);
    }

    async ValidateTeacher(validateTeacherDto: ValidateTeacherDTO) {
        return await this.client.send({ role: "items", cmd: "ValidatTeacher" }, validateTeacherDto);
    }

    async UpdateTeacher(id: string, createTeacherDto: CreateTeacherDto) {
        return await this.client.send({ role: "items", cmd: "UpdateTeacher" }, createTeacherDto);
    }

    async DeleteTeacher(id: string) {
        return await this.client.send({ role: "items", cmd: "DeleteTeacher" }, id)
    }

    async getTeacherById(id: string) {
        return await this.client.send({ role: "items", cmd: "GetTeacherById" }, id)
    }
}
