import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';
import { Job } from '../schemas/job.schema'
import { PersonalDetail } from '../schemas/personal-detail.schema';
import * as mongoose from 'mongoose';

@Schema({ collection: "applications", timestamps: true })
export class Application {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Job', required: true }) 
  job_id: Job

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }) 
  user_id:User
  
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'PersonalDetail', required: true }) 
    personal_details_id: PersonalDetail
    
  @Prop({ required: true})
    email: string;

  @Prop({ required: true, enum: ['applied', 'rejected'] })
    status: string;

  @Prop({ default: 'resumes/resumefile.pdf' })
    resume_path: string;

}

export const ApplicationSchema = SchemaFactory.createForClass(Application);
