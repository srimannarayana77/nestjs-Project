import { IsEnum, IsMongoId, IsNotEmpty, IsOptional,IsEmail } from 'class-validator';
export class CreateApplicationDto {

    @IsMongoId()
    @IsNotEmpty({ message: 'job_id is required' })
    job_id: string;
    
    @IsOptional()
    @IsMongoId()
    user_id?: string;
  
    @IsMongoId()
    @IsNotEmpty({ message: 'personal_details_id is required' })
    personal_details_id: string;
    
    @IsEmail()
    @IsNotEmpty({ message: 'email is required' })
    email: string;
    
    @IsEnum(['applied', 'rejected'], { message: 'status must be either "applied" or "rejected"' })
    @IsNotEmpty({ message: 'status is required' })
    status: string;

    @IsNotEmpty({ message: 'resume_path is required' })
    resume_path: string;

}
