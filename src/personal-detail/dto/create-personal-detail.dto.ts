import { IsString, IsArray, IsNumber, IsEnum, IsNotEmpty, IsMongoId, IsOptional } from 'class-validator';
import { ObjectId } from 'mongoose';

export class CreatePersonalDetailDto {
    @IsOptional()
    @IsMongoId()
    user_id?: ObjectId;

    @IsNotEmpty({ message: 'Date of birth is required' })
    date_of_birth: Date;

    @IsEnum(['male', 'female'], { message: 'Invalid gender' })
    @IsNotEmpty({ message: 'Gender is required' })
    gender: string;

    @IsString({ message: 'Invalid address' })
    @IsNotEmpty({ message: 'Address is required' })
    address: string;

    @IsString({ message: 'Invalid city' })
    @IsNotEmpty({ message: 'City is required' })
    city: string;

    @IsString({ message: 'Invalid state' })
    @IsNotEmpty({ message: 'State is required' })
    state: string;

    @IsString({ message: 'Invalid country' })
    @IsNotEmpty({ message: 'Country is required' })
    country: string;

    @IsNumber({}, { message: 'Pincode must be a number' })
    @IsNotEmpty({ message: 'Pincode is required' })
    pincode: number;

    @IsArray()
    @IsNotEmpty({ message: 'Educational details are required' })
    educational_details: {
        degree: string;
        institution: string;
        year_of_completion: number;
    }[];

    @IsArray({ message: 'Skills must be an array' })
    @IsNotEmpty({ message: 'Skills are required' })
    skills: string[];
}
