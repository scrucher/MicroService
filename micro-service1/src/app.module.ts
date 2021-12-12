import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { StudentsModule } from './students/students.module';
import { ClassroomModule } from './classroom/classroom.module';
import { CourseModule } from './course/course.module';
import { TeacherModule } from './teacher/teacher.module';

@Module({
  imports: [
    StudentsModule, CourseModule, ClassroomModule, TeacherModule,
    MongooseModule.forRoot('mongodb://localhost:27018/microservice'),
  ],
})
export class AppModule {}
