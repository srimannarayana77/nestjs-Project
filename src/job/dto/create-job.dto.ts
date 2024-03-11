import { IsString, IsArray, IsNumber, IsEnum, IsNotEmpty,IsMongoId,IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreateJobDto {
  
  @IsOptional()
  @IsMongoId()
  user_id?: ObjectId;

  @IsString({ message: 'Invalid title' })
  @IsNotEmpty({ message: 'Title is required' }) 
  title: string;

  @IsString({ each: true, message: 'Each skill must be a string' })
  @IsNotEmpty({ each: true, message: 'Each skill is required' })
  skills: string[];

  @IsString({ message: 'Invalid Description' })
  @IsNotEmpty({ message: 'Description is required' })
  description: string;

 
  created_by?: string;

  @IsNumber({}, { message: 'Number of openings give in numbers' })
  @IsNotEmpty({ message: 'Number of openings is required' })
  number_of_openings: number;


  @IsString({ message: 'Invalid Company name ' })
  @IsNotEmpty({ message: 'Company name is required' })
  company_name: string;

  @IsString({ message: 'Invalid Job location' })
  @IsNotEmpty({ message: 'Job location is required' })
  job_location: string;

  @IsNumber({}, { message: 'give salary in numbers' })
  @IsNotEmpty({ message: 'Salary is required' })
  salary: number;

  @IsEnum(['active', 'inactive'], { message: 'Invalid status' })
  @IsNotEmpty({ message: 'Status is required' })
  status: string;


  @IsEnum(['fresher', 'experienced'], { message: 'Invalid experience level' })
  @IsNotEmpty({ message: 'Experience level is required' })
  experience_level: string;

  @IsEnum(['fulltime', 'parttime'], { message: 'Invalid employment type' })
  @IsNotEmpty({ message: 'Employment type is required' })
  employment_type: string;
}

