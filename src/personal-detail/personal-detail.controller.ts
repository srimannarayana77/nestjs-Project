import { Controller, Get, Post, Put, Param, Body, HttpStatus, Request ,UseGuards, Req} from '@nestjs/common';
import { PersonalDetailService } from './personal-detail.service';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import {ObjectId} from 'mongoose'
import { PersonalDetails } from '../interfaces/personalDetail.interface';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import {UpdatePersonalDetailDto} from './dto/update-personal-detail.dto'
import { AuthGuard } from 'src/middlewares/auth.guard';

@Controller('details')
export class PersonalDetailController {
  constructor(private personalDetailService: PersonalDetailService) { }
  @UseGuards(AuthGuard)
  @Post()
  async create(
    @Body() createPersonalDetailDto: CreatePersonalDetailDto,
    @Req() req
  ): Promise<ApiResponse<PersonalDetails>> {
    try {
     createPersonalDetailDto.user_id = req.user.id;
      const createdPersonalDetail: PersonalDetails = await this.personalDetailService.create(createPersonalDetailDto);
      return { success: true, message: 'Personal details created successfully', data: createdPersonalDetail, status: HttpStatus.CREATED };
    } catch (error) {
      console.log("Errors while creating details:", error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  } 


  @UseGuards(AuthGuard)
  @Get('profile')
  async findProfile(@Request() req): Promise<ApiResponse<PersonalDetails>> {
    try {
      const user = req.user
      console.log("user=", user)
      
      const personalDetail:PersonalDetails = await this.personalDetailService.findByUserId(user.id);
      console.log("personalDetail=",personalDetail)
      if (!personalDetail) {
        return { success: false, message: 'Personal details not found', status: HttpStatus.NOT_FOUND };
      }
      
      return { success: true, message: 'Personal details retrived successfully', data: personalDetail, status: HttpStatus.OK };
    } catch (error) {
      console.log("errors while getting personaldetails:",error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    
    }
  }

  @UseGuards(AuthGuard)
  @Put('update')
  async update( @Body() updatePersonalDetailDto: CreatePersonalDetailDto, @Request() req): Promise<ApiResponse<PersonalDetails>> {
    try {
      const user = req.user
      console.log("update_user=",user)
      const updatedPersonalDetail:PersonalDetails = await this.personalDetailService.update(user.id, updatePersonalDetailDto);
      console.log("updatedPersonalDetail=",updatedPersonalDetail)
      if (!updatedPersonalDetail) {
        return {success: false, message: 'Personal details not found', status: HttpStatus.NOT_FOUND};
      }
      return {success: true, message: 'Personal details updated successfully', data: updatedPersonalDetail, status: HttpStatus.OK};
    } catch (error) {
      return {success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}
