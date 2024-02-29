import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';


export type JobDocument = Job & Document;

@Schema({ collection: "jobs", timestamps: true })
export class Job {
  @Prop({ required: true })
  title: string;

  @Prop({ type: [String], required: true })
  skills: string[];

  @Prop({ required: true })
  description: string;

  @Prop({ required: true })
  created_by: string;

  @Prop({ required: true })
  number_of_openings: number;

  @Prop({ required: true })
  company_name: string;

  @Prop({ required: true })
  job_location: string;

  @Prop({ required: true })
  salary: number;

  @Prop({ required: true, enum: ['fresher', 'experienced'] })
  experience_level: string;

  @Prop({ required: true, enum: ['fulltime', 'parttime'] })
  employment_type: string;
}

export const JobSchema = SchemaFactory.createForClass(Job);
