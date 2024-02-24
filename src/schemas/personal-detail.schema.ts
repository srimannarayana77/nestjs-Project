import { Schema, model } from 'mongoose';

const personalDetailSchema = new Schema({
    full_name: {
      type:String,
      required:true
    },
    date_of_birth: {
        type: Date,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['male', 'female']
    },
    address:{
      type:String,
      required:true
    },
    city: {
      type:String,
      required:true
    },
    state: {
      type:String,
      required:true
    },
    country:{
      type:String,
      required:true
    },
    pincode:{
      type:Number,
      required:true
    },
    phone_number: {
        type: Number,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
}, {
    timestamps: true 
});

export const PersonalDetailModel = model('PersonalDetail', personalDetailSchema,"personaldetails");
