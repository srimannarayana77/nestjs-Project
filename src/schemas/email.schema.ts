import { Schema, model } from 'mongoose';

const emailSchema = new Schema({
    email_from: {
        personalDetail: {
            name: String,
            email: String
        },
        user: String
    },
    email_to: {
        User: {
            name: String,
            email: String
        },
        user: String
    },
    subject: {  
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
 }, {
        timestamps: true
    });

export const EmailModel = model('Email', emailSchema, "emails");
