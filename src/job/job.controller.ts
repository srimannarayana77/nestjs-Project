import { Controller, Get, Post, Body, Param, Put, Delete, HttpStatus,UseGuards, Req} from '@nestjs/common';
import { CreateJobDto } from './dto/create-job.dto';
import { Jobs } from '../interfaces/job.interface';
import { JobService } from './job.service';
import { ApiResponse } from '../interfaces/apiResponse.interface';
import { RoleGuard } from '../middlewares/role.guard';

@Controller('jobs')
export class JobController {
  constructor(private readonly jobService: JobService) {}
  
  @UseGuards(RoleGuard)
  @Post()
  async create(@Body() createJobDto: CreateJobDto,@Req() req): Promise<ApiResponse<Jobs>> {
    try {
      createJobDto.user_id = req.user.id;
      createJobDto.created_by = req.user.name  
      const createdJob: Jobs = await this.jobService.create(createJobDto);
      return { success: true,message:'Create a job Successfully' ,data: createdJob, status: HttpStatus.CREATED };
    } catch (error) {
      console.error('Error for creating job:', error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @Get('all')
  async findAll(): Promise<ApiResponse<Jobs[]>> {
    try {
      const jobs: Jobs[] = await this.jobService.findAll();
      return { success: true,message:'Retriving all jobs successfully', data: jobs, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error for getting all jobs:', error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string): Promise<ApiResponse<Jobs>> {
    try {
      const job: Jobs = await this.jobService.findOne(id);
      if (!job) {
        return { success: false, error: 'Job not found', status: HttpStatus.NOT_FOUND };
      }

      return { success: true,message:'Retriving a single job successfully', data: job, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error for getting single job:', error)
      return { success: false, error: error.message, status: HttpStatus.NOT_FOUND };
    }
  } 
 
  @UseGuards(RoleGuard)
  @Put(':id/update')
  async update(@Param('id') id: string, @Body() updateJobDto: CreateJobDto): Promise<ApiResponse<Jobs>> {
    try {
      const updatedJob: Jobs = await this.jobService.update(id, updateJobDto);
      if (!updatedJob) {
        return { success: false, error: 'Job not found', status: HttpStatus.NOT_FOUND };
      }
      return { success: true,message:'Updating a job Successfully', data: updatedJob, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error for updating job:', error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
  
  @UseGuards(RoleGuard)
  @Delete(':id/delete')
  async remove(@Param('id') id: string): Promise<ApiResponse<Jobs>> {
    try {
      const deletedJob: Jobs = await this.jobService.delete(id);
      if (!deletedJob) {
        return { success: false, error: 'Job not found', status: HttpStatus.NOT_FOUND };
      }
      return { success: true,message:'Removing a job Successfully', data: deletedJob, status: HttpStatus.OK };
    } catch (error) {
      console.error('Error for deleting job:', error)
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }
}   
