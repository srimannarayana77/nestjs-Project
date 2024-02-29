import { User } from '../schemas/user.schema';
import { Job } from '../schemas/job.schema'
import { PersonalDetail } from '../schemas/personal-detail.schema';

export interface Applications{
    job_id: Job;
    user_id: User;
    personal_details_id: PersonalDetail;
    status: string;
    resume_path: string;
}