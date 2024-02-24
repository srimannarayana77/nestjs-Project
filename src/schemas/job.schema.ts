import { Schema, model } from 'mongoose';

const jobSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    skills: {
        type: [String],
        required: true
    },
    description: {
        type: String,
        required: true
    },
    created_by: {
        type: String,
        required: true
    },
    number_of_openings: {
        type: Number,
        required: true
    },
    company_name: {
        type: String,
        required: true
    },
    job_location: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    experience_level: {
        type: String,
        enum: ['fresher', 'experienced'],
        required: true
    },
    employment_type: {
        type: String,
        enum: ['fulltime', 'parttime'],
        required: true
    },
}, {
    timestamps: true
});

export const JobModel = model('Job', jobSchema, "jobs");
