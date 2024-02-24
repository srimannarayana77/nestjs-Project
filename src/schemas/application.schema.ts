import { Schema, model } from 'mongoose';

const applicationSchema = new Schema({
    jobId: {
        type: Schema.Types.ObjectId,
        ref: 'Job',
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    personalDetailsId: {
        type: Schema.Types.ObjectId,
        ref: 'PersonalDetail',
        required: true
    },
    status: {
        type: String,
        enum: ['applied', 'rejected'],
        required: true
    },
    resume: {
        type: String,
        required: true
    },
}, {
    timestamps: true
});

export const ApplicationModel = model('Application', applicationSchema, "applications");
