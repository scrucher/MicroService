import { Injectable, InternalServerErrorException, Logger } from '@nestjs/common';
import { CreatestudentsDto } from './createstudents-dto.interface';
import { ClientProxy, ClientProxyFactory, Transport } from '@nestjs/microservices';
import { ValidateUserDTO } from './validate-user.dto';


@Injectable()
export class StudentsService {
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


    async CreateStudent(createStudentsDto: CreatestudentsDto) {
        // await this.client.connect();
        return await this.client.send({role: "items", cmd: 'CreateStudent'}, createStudentsDto);
    }

    async ValidateStudent(validateStudentDto: ValidateUserDTO){
        return await this.client.send({ role: "items", cmd: "ValidateStudent" }, validateStudentDto);
    }

    async UpdateStudent(id: string, createStudentsDto: CreatestudentsDto) {
        return await this.client.send({ role: "items", cmd: "UpdateUser" }, createStudentsDto);
    }

    async DeleteStudent(id: string) {
        return await this.client.send({role:"items", cmd: "DeleteStudent"}, id)
    }

    async getStudentById(id: string) {
        return await this.client.send({role:"items", cmd:"GetStudentsById"}, id)
    }

}
