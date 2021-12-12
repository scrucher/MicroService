import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { JwtStrategy } from './jwt.startegy';
import { StudentsController } from './students.controller';
import { Students, StudentsSchema } from './students.schema';
import { StudentsService } from './students.service';
import { JwtModule, JwtService } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';

@Module({
    imports: [
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'topsecret51',
            // signOptions: { expiresIn: '360s' }
        }),
        MongooseModule.forFeature([{ name: Students.name, schema: StudentsSchema }])
    ],
    providers: [StudentsService, JwtStrategy,],
    controllers: [StudentsController],
    exports: [
        JwtStrategy,
        PassportModule,
    ],
})
export class StudentsModule { }

