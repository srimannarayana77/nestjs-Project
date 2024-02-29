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
  constructor(@InjectModel(Application.name) private applicationModel: Model<Application>) { }
  async getPreSignedURL(bucketName: string, key: string, contentType: string) {
    const region = configData.awsBucketRegion;
    console.log("region=", region)
    const accessKeyId = configData.awsAccessKeyId;
    console.log("accesskey=", accessKeyId)
    const secretKey = configData.awsSecretAccessKey;
    console.log("secretkey=", secretKey)
    const s3 = new S3({//creating s3 client for interacting the s3 for uploading files 
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretKey,
    });
    console.log("s3=", s3)
    let params = { //parameters required for generating a presigned URL
      Bucket: bucketName,
      Key: key,
      ContentType: contentType,
      Expires: 3600
    };
    console.log("params=", params)
    return await s3.getSignedUrlPromise('putObject', params);//here putobject is used for upload operation
  }
    
  async getPreSignedURLToViewObject(): Promise<string> {
    const region = configData.awsBucketRegion;
    const accessKeyId = configData.awsAccessKeyId;
    const secretKey = configData.awsSecretAccessKey;
  
    const s3 = new S3({
      region: region,
      accessKeyId: accessKeyId,
      secretAccessKey: secretKey
    });
  
    const params = {
      Bucket: "peepul-agri-dev",
      Key: "resumes/resumefile.pdf",
      Expires: 1800
    };
  
    const preSignedURL = await s3.getSignedUrlPromise('getObject', params);
    return preSignedURL;

  }
  
  async create(createApplicationDto: CreateApplicationDto): Promise<Application> {
    const createdApplication = new this.applicationModel(createApplicationDto);
    return createdApplication.save();
  }

  async findAll(): Promise<Application[]> {
    return this.applicationModel.find().exec();
  }

  async findOne(id: string): Promise<Application | null> {
    return this.applicationModel.findById(id).exec(); 
  }
  
  async sendEmail(emailDto:EmailDto) {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sriman793@gmail.com',
          pass: 'ceqk egqz moiv vmxv',
        },
      });

      const mailOptions = {
        from: 'sriman793@gmail.com',
        to:emailDto.email,
        subject: 'Application Submitted Successfully',
        text: `Your Application has submitted successfully`,
      };

      await transporter.sendMail(mailOptions);
      console.log('email sent successfully');

  }
}
