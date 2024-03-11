import { Controller, Get, Post, Body, Patch, Param, Delete,HttpStatus,UseGuards, Req } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { CreateApplicationDto } from './dto/create-application.dto';
import { UpdateApplicationDto } from './dto/update-application.dto';
import { Applications } from 'src/interfaces/application.interface';
import { ApiResponse } from 'src/interfaces/apiResponse.interface';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { EmailDto } from './dto/email-dto';
import { sendEmails } from '../helpers/sendInBlueEmailHelper'
import {getPreSignedURL,getPreSignedURLToViewObject} from '../helpers/uploadResumeHelper'


@Controller('application')
export class ApplicationController {
  constructor(private readonly applicationService: ApplicationService) { }
  @Post('upload')
  async uploadFile(@Body() requestBody: { bucketName: string, key: string, contentType: string }) {
    try {
      const { bucketName, key, contentType } = requestBody;
      const presignedUrl = await getPreSignedURL(bucketName, key, contentType);
      console.log("presignedurl=", presignedUrl)
      return { success: true, message: 'Presigned url retrived successfully', data: presignedUrl, key, status: HttpStatus.OK };
    } catch (error) {
      return { error: 'Failed to upload file', status: HttpStatus.INTERNAL_SERVER_ERROR };
    }

  }
  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createApplicationDto: CreateApplicationDto, @Req() req): Promise<ApiResponse<Applications>> {
    try {
      createApplicationDto.user_id = req.user.id;
      const createdApplication: Applications = await this.applicationService.create(createApplicationDto);
      const emailDto = new EmailDto(createApplicationDto.email);
      await sendEmails(emailDto);
      return { success: true, message: 'Application created successfully', data: createdApplication, status: HttpStatus.CREATED };
    } catch (error) {
      console.error('Error creating application:', error);
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @Get('all')
  async findAll(): Promise<ApiResponse<Applications[]>> {
    try {
      const applications: Applications[] = await this.applicationService.findAll();
      return { success: true, message: 'All Applications retrieved successfully', data: applications, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error retrieving applications:', error);
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }


  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Applications>> {
    try {
      const application: Applications = await this.applicationService.findOne(id);
      if (!application) {
        return { success: false, error: 'Application not found', status: HttpStatus.NOT_FOUND };
      }
      const preSignedURL = await getPreSignedURLToViewObject();
      return { success: true, message: 'Pre-signed URL generated successfully', url: preSignedURL, status: HttpStatus.OK };
      // const preSignedURL = await this.applicationService.getPreSignedURLToViewObject(application.bucketName, application.key);
      // const applicationWithPreSignedURL = { ...application, preSignedURL };
      // return { success: true, message: 'Application retrieved successfully', data: application, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error retrieving single  application:', error);
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
