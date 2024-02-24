import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type UserDocument = User & Document;

@Schema({collection:"users",timestamps:true})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true, unique: true })
  user_name: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop({ required: true })
  password: string;

  @Prop({ required: true })
  confirm_password: string;
  
  @Prop({ required: true, enum: ['admin', 'superAdmin', 'user'] })
  user_type: string;

  @Prop({ required: true })
  phone_number: number;

  @Prop()
  otp?: number;

  @Prop({ default: false })
  is_verified?: boolean;

}

export const UserSchema = SchemaFactory.createForClass(User);




// import {Schema, model} from 'mongoose';

// const userSchema = new Schema({
//     name: {
//         type:String,
//         required:true
//     },
//     user_name: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password:{ 
//         type:String,
//         required:true
//     },
//     user_type: {
//         type: String,
//         required: true,
//         enum: ['Admin', 'SuperAdmin', 'User']
//     },
//     phone_number: {
//         type: Number,
//         required: true
//     }
// }, {
//     timestamps: true 
// });

// export const UserModel = model('User',userSchema,"users")
