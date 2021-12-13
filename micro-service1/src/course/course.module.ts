import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { CoursesController } from './course.controller';
import { Course, CourseSchema } from './course.schema';
import { CourseService } from './course.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Course.name, schema: CourseSchema }])

  ],
  providers: [CourseService],
  controllers: [CoursesController],
})
export class CourseModule {}
