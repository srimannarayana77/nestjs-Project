import { Module } from '@nestjs/common';
import { JobService } from './job.service';
import { JobController } from './job.controller';
import { MongooseModule } from '@nestjs/mongoose'; //interact with MongoDB using Mongoose within your NestJS application.
import { Job, JobSchema } from '../schemas/job.schema';
import { JwtService } from '@nestjs/jwt';
@Module({
  imports: [MongooseModule.forFeature([{ name: Job.name, schema: JobSchema }])],
  controllers: [JobController],
  providers: [JobService,JwtService],
})
export class JobModule {} 
    