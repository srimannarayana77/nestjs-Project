import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { User } from '../schemas/user.schema';
import * as mongoose from 'mongoose';

export type PersonalDetailDocument = PersonalDetail & Document;

@Schema({ collection: "personaldetails", timestamps: true })
export class PersonalDetail {

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' }) 
  user_id?: User

  @Prop({ required: true })
  date_of_birth: Date;

  @Prop({ required: true, enum: ['male', 'female'] })
  gender: string;

  @Prop({ required: true })
  address: string;

  @Prop({ required: true })
  city: string;

  @Prop({ required: true })
  state: string;

  @Prop({ required: true })
  country: string;

  @Prop({ required: true })
  pincode: number

  @Prop({required:true})
  educational_details: {
    degree: string;
    institution: string;
    year_of_completion: number;
  }[];

  @Prop({required:true})
  skills: string[];

}

export const PersonalDetailSchema = SchemaFactory.createForClass(PersonalDetail);
