import { Module } from '@nestjs/common';
import { JwtStrategy } from './jwt.startegy';
import { TeacherController } from './teacher.controller';
import { TeacherService } from './teacher.service';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { Teacher, TeacherSchema } from './teacher.schema';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    PassportModule.register({ defaultStrategy: 'jwt' }),
    JwtModule.register({
      secret: 'topsecret51',
      // signOptions: { expiresIn: '360s' }
    }),
    MongooseModule.forFeature([{ name: Teacher.name, schema: TeacherSchema }])
  ],
  providers: [TeacherService, JwtStrategy],
  controllers: [TeacherController],
  exports: [
    JwtStrategy,
    PassportModule,
  ],
})
export class TeacherModule {}
