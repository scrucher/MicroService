import { Module } from '@nestjs/common';
import { CoursesController } from './course.controller';
import { CourseService } from './course.service';

@Module({
  providers: [CourseService],
  controllers: [CoursesController],
})
export class CourseModule {}
