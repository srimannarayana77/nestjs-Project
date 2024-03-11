import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Job } from '../schemas/job.schema';
import { CreateJobDto } from './dto/create-job.dto';
import { UpdateJobDto } from './dto/update-job.dto';

@Injectable()
export class JobService {
  constructor(@InjectModel(Job.name) private  jobModel: Model<Job>) {}

  async create(createJobDto: CreateJobDto): Promise<Job> {
    const createdJob = new this.jobModel(createJobDto);
    return createdJob.save();
  }

  async findAll(): Promise<Job[]> {
    return this.jobModel.find().populate('user_id').exec();
  }

  async findOne(id: string): Promise<Job> {
    return this.jobModel.findById(id).exec();
  }

  async update(id: string, updateJobDto: UpdateJobDto): Promise<Job> {
    return this.jobModel.findByIdAndUpdate(id, updateJobDto, { new: true }).exec();
  }

  async delete(id: string): Promise<Job> {
    return this.jobModel.findByIdAndDelete(id).exec();
  }
}
