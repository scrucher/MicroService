import { Injectable } from '@nestjs/common';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { CreateCourseDto } from './create-ourse.dto';

@Injectable()
export class CourseService {
    private client: ClientProxy;

    constructor() {
        this.client = ClientProxyFactory.create({
            transport: Transport.REDIS,
            options: {
                url: 'redis://localhost:6379',
            }
        })
    }

    async CreateCourse(createCourseDto: CreateCourseDto) {
        return await this.client.send({ role: "items", cmd: "CreateCourse" }, createCourseDto);
    }

    async GetAllCourses() {
        return await this.client.send({ role: "items", cmd: "GetAllCourses" }, "data");
    }

    async GetActiveCourses() {
        return await this.client.send({ role: "items", cmd: "GetActiveCourses" }, "data");
    }

    async UpdateCourse(id: string, createCourseDto: CreateCourseDto) {
        return await this.client.send({ role: "items", cmd: "UpdateCourse" }, {id, createCourseDto})
    }

    async DeleteCourse(id: string) {
        return await this.client.send({ role: "items", cmd: "DeleteCourse" }, id);
    }




}
