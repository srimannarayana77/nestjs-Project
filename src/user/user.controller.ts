import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus,UseGuards,Request,Res,Query, Render} from '@nestjs/common';
import { UserService } from './user.service'; 
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user-dto';
import { VerifyOtpDto } from './dto/verify-otp-user.dto';
import { ResetPasswordDto } from './dto/reset-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetUserDto } from './dto/forget-user.dto';
import { AuthGuard } from 'src/middlewares/auth.guard';
import { configData } from 'src/config/appConfig.';
import {Users} from '../interfaces/user.interface'
import { ApiResponse } from 'src/interfaces/apiResponse.interface';
import * as bcrypt from 'bcrypt';
import { ejsTemplate } from 'views';
import * as ejs from "ejs";
import { filterUsers } from 'src/helpers/filters';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService,) {}

  @Post()
  async create(@Body()createUserDto: CreateUserDto):Promise<ApiResponse<Users[]>> {
    try {
      const emailExists = await this.userService.emailExists(createUserDto.email);
      if (emailExists) {
       return { success:false,message: 'Email already exists' , status:HttpStatus.BAD_REQUEST};
      }
      const usernameExists = await this.userService.usernameExists(createUserDto.user_name);
      if (usernameExists) {
        throw new HttpException({success:false, message: 'Username already exists' }, HttpStatus.BAD_REQUEST);
      }
      const createdUser:Users = await this.userService.create(createUserDto);
      return { success:true,data: createdUser, status: HttpStatus.CREATED };
    } catch (error) {
      console.error('Error for creating  user:',error)
      return { success:false, error: error.message ,status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

 
  @Get('all')
  // @Render('index')
  async findAll(@Query('page') page: number = 1,@Query('limit') limit: number =3,@Query('sortBy') sortBy: string = '_id',@Query('sortType') sortType: string = 'desc',@Query('name') name?: string,@Query('user_name') user_name?: string,@Query('email') email?: string,@Query('user_type') user_type?: string,@Query('phone_number') phone_number?: string): Promise<ApiResponse<Users[]>> {
    try {
      let filter: any = {}; 
      if (name || user_name || email || user_type || phone_number) {
        filter = { name, user_name, email, user_type, phone_number };
      }
      console.log("filters=",filter)
      const sort = { [sortBy]: sortType === 'desc' ? -1 : 1 };
      console.log("sort=",sort)
      const skip = (page - 1) * limit; 
      console.log("skip=",skip)
      const users = await this.userService.findAll(filter, sort, limit, skip);
      const ejsData = { data: users }; // Pass the users data to the template
      let ejsResponse = ejs.render(ejsTemplate, ejsData); 
          ejsResponse = ejsResponse.replace(/\n/g, '');
      return(ejsResponse)
      // return { success: true, data: ejsResponse, status: HttpStatus.OK };

    } catch (error) {
      console.error('Error fetching users:', error);
      return { success: false, error: error.message, status: HttpStatus.INTERNAL_SERVER_ERROR };
    }
  }

  // @Get('all')
  // async findAll():Promise<ApiResponse<Users[]>> {
  //   try {
  //     const users:Users[] = await this.userService.findAll();
  //     return { success: true, data:users,status: HttpStatus.OK };
  //   } catch (error) {
  //     console.error('Error for getall users:',error)
  //     return { success:false, error: error.message ,status: HttpStatus.INTERNAL_SERVER_ERROR};
  //   }
  // }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto):Promise<ApiResponse<Users[]>> {
    try {
      const user:Users = await this.userService.findUserByEmailOrUsername(signInUserDto);
      console.log("user=",user)
      if (!user) {
        return {success:false, message: 'User not found' , status:HttpStatus.NOT_FOUND};
      }
      const isPasswordValid = await bcrypt.compare(signInUserDto.password, user.password);
      if (!isPasswordValid) {
        return {success:false, message: 'Invalid password' , status:HttpStatus.UNAUTHORIZED};
      }
      const expiresIn = 36000;
      const secretKey = configData.secretKey;
      const access_token = this.jwtService.sign({id:user._id,email: user.email , password: user.password,user_type:user.user_type,name:user.name }, { expiresIn, secret: secretKey });
      return { success: true,message:"User sign-in successfully" ,data:{user,access_token},status: HttpStatus.OK };
    } catch (error) {
      console.error('Errors in signin:',error)
     return { success: false, error: error.message ,status:HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req):Promise<ApiResponse<Users>> {
    try {
      const user = req.user
      console.log("userId=",user)
      const userProfile:Users = await this.userService.getUserById(user.userId);
      console.log("userprofile=",userProfile)
      if (!userProfile) {
        throw new HttpException({ success: false, message: 'User profile not found' }, HttpStatus.NOT_FOUND);
      }
      return { success: true, data:userProfile,status: HttpStatus.OK  };
    } catch (error) {
      console.error('Error for getting profile:',error)
      return { success: false, error: 'Internal server error' ,status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  
  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUserprofile(@Body()updateUserDto: CreateUserDto,@Request() req):Promise<ApiResponse<Users[]>>{
    try {
      const updateUser = req.user 
      console.log("updateuser=",updateUser   )
      const updateProfile:Users = await this.userService.updateUserById(updateUser.id,updateUserDto);
      console.log("updateprofile=",updateProfile);
    
      if (!updateProfile) {
        throw new HttpException({ success: false, message: 'User profile not found' }, HttpStatus.NOT_FOUND);
      }
      return {success: true, data:updateProfile,status: HttpStatus.OK};
    }catch (error) {
      console.error('Error for updating profile:',error)
      return { success: false, error: 'Internal server error' , status:HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @Delete(':id/delete')
  async deleteUser(@Param('id') userId: string):Promise<ApiResponse<Users[]>> {
    try {
      const deletedUser:Users = await this.userService.deleteUserById(userId);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User deleted successfully', data:deletedUser ,status: HttpStatus.OK};
    } catch (error) {
      console.error('Error for delete user:',error)
      return { success: false,message:'Internal server error',status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }
   
  @Post('forget')
  async forgetPassword(@Body() forgetUserDto: ForgetUserDto):Promise<ApiResponse<Users>> {
    try {
      const otp:number = await this.userService.generateOtp(forgetUserDto);
      await this.userService.sendOtp(forgetUserDto, otp);
      return { success:true, message: 'An OTP has been sent to your email address',status: HttpStatus.OK };
    } catch (error) {
      console.error('Error while processing forget password request:', error);
      return { success: false,message:'Failed to process forget password request',status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @Post('verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto):Promise<ApiResponse<Users[]>>{
    try {
      await this.userService.verifyOtp(verifyOtpDto);
      return { success:true,message: 'OTP verified successfully',status: HttpStatus.OK };
    } catch (error) {
      console.error('Error while verifying OTP:', error);
      return { success: false,message:'Failed to verify OTP',status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
    }
    
    @Post('reset')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto):Promise<ApiResponse<Users[]>> {
      try {
        await this.userService.resetPassword(resetPasswordDto);
        return { success:true,message: 'Password reset successfully',status: HttpStatus.OK };
      } catch (error) {
        console.error('Error resetting password:', error);
        return { success: false,message:'Failed to reset password', status:HttpStatus.INTERNAL_SERVER_ERROR};
      }
    } 

  }
