import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Application } from 'src/schemas/application.schema';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { configData } from 'src/config/appConfig.';
import { S3 } from 'aws-sdk';
import * as nodemailer from 'nodemailer';
import { EmailDto } from './dto/email-dto';


@Injectable()
export class ApplicationService {
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) {} 
  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().populate('job_id').populate('user_id').populate('personal_details_id').exec();
  }

  async findOne(id: string): Promise<Application | null> {
    return this.applicationModel.findById(id).exec(); 
  }

  
  
  // async sendEmail(emailDto:EmailDto) {
  //     const transporter = nodemailer.createTransport({
  //       service: 'gmail',
  //       auth: {
  //         user: 'sriman793@gmail.com',
  //         pass: 'ceqk egqz moiv vmxv',
  //       },
  //     });

  //     const mailOptions = {
  //       from: 'sriman793@gmail.com',
  //       to:emailDto.email,
  //       subject: 'Application Submitted Successfully',
  //       text: `Your Application has submitted successfully`,
  //     };

  //     await transporter.sendMail(mailOptions);
  //     console.log('email sent successfully');

  // }
}
