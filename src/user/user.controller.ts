import { Controller, Get, Post, Body, Patch, Param, Delete, HttpException, HttpStatus,UseGuards,Request} from '@nestjs/common';
import { UserService } from './user.service';
import { ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user-dto';
import { VerifyOtpDto } from './dto/verify-otp-user.dto';
import { ResetPasswordDto } from './dto/reset-user.dto';
import { JwtService } from '@nestjs/jwt';
import { ForgetUserDto } from './dto/forget-user.dto';
import { AuthGuard } from 'src/middlewares/verifyToken';
import { configData } from 'src/config/appConfig.';
import * as bcrypt from 'bcrypt';

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService,private readonly jwtService: JwtService,) {}

  @Post()
  async create(@Body()createUserDto: CreateUserDto) {
    try {
      if (createUserDto.password !== createUserDto.confirm_password) {
        throw new HttpException({ message: 'Password and confirm password do not match' }, HttpStatus.BAD_REQUEST);
      }
      const emailExists = await this.userService.emailExists(createUserDto.email);
      if (emailExists) {
        throw new HttpException({ success:false,message: 'Email already exists' }, HttpStatus.BAD_REQUEST);
      }
      const usernameExists = await this.userService.usernameExists(createUserDto.user_name);
      if (usernameExists) {
        throw new HttpException({success:false, message: 'Username already exists' }, HttpStatus.BAD_REQUEST);
      }
      const createdUser = await this.userService.create(createUserDto);
      return { success:true,user: createdUser, status: HttpStatus.CREATED };
    } catch (error) {
      console.error('Error for creating  user:',error)
      return { success:false, error: error.message ,status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }
  

  @Get('all')
  async findAll() {
    try {
      const users = await this.userService.findAll();
      return { success: true, users,status: HttpStatus.OK };
    } catch (error) {
      console.error('Error for getall users:',error)
      return { success:false, error: error.message ,status: HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @Post('/signin')
  async signIn(@Body() signInUserDto: SignInUserDto) {
    try {
      const user:any = await this.userService.findUserByEmailOrUsername(signInUserDto);
      console.log("user=",user)
      if (!user) {
        return {success:false, message: 'User not found' , status:HttpStatus.NOT_FOUND};
      }
      const isPasswordValid = await bcrypt.compare(signInUserDto.password, user.password);
      console.log("dto.passwrd=",signInUserDto.password)
      console.log("password=",user.password)
      if (!isPasswordValid) {
        return {success:false, message: 'Invalid password' , status:HttpStatus.UNAUTHORIZED};
      }
      const expiresIn = 3600;
      const secretKey = configData.secretKey;
      let userId = user._id;
      const token = this.jwtService.sign({userId,email: user.email , password: user.password  }, { expiresIn, secret: secretKey });
      return { success: true, user,token,status: HttpStatus.OK };
    } catch (error) {
      console.error('Errors in signin:',error)
     return { success: false, error: error.message ,status:HttpStatus.INTERNAL_SERVER_ERROR};
    }
  }

  @UseGuards(AuthGuard)
  @Get('profile')
  async getUserProfile(@Request() req) {
    try {
      const user = req.user
      console.log("userId=",user)
      const userProfile = await this.userService.getUserById(user.userId);
      console.log("userprofile=",userProfile)
      if (!userProfile) {
        throw new HttpException({ success: false, message: 'User profile not found' }, HttpStatus.NOT_FOUND);
      }
      return { success: true, userProfile,status: HttpStatus.OK  };
    } catch (error) {
      console.error('Error for getting profile:',error)
      throw new HttpException({ success: false, error: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  
  @UseGuards(AuthGuard)
  @Patch('update')
  async updateUserprofile(@Body()updateUserDto: CreateUserDto,@Request() req:any){
    try {
      const updateUser = req.user 
      console.log("updateuser=",updateUser   )
      const updateProfile = await this.userService.updateUserById(updateUserDto,updateUser.userId);
      console.log("updateprofile=",updateProfile);
      if (!updateProfile) {
        throw new HttpException({ success: false, message: 'User profile not found' }, HttpStatus.NOT_FOUND);
      }
      return {success: true, updateProfile,status: HttpStatus.OK};
    }catch (error) {
      console.error('Error for updating profile:',error)
      throw new HttpException({ success: false, error: 'Internal server error' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Delete(':id')
  async deleteUser(@Param('id') userId: string) {
    try {
      const deletedUser = await this.userService.deleteUserById(userId);
      if (!deletedUser) {
        throw new HttpException('User not found', HttpStatus.NOT_FOUND);
      }
      return { success: true, message: 'User deleted successfully', deletedUser ,status: HttpStatus.OK};
    } catch (error) {
      console.error('Error for delete user:',error)
      throw new HttpException('Internal server error', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
   
  @Post('forget')
  async forgetPassword(@Body() forgetUserDto: ForgetUserDto):Promise<any> {
    try {
      const otp = await this.userService.generateOtp(forgetUserDto);
      await this.userService.sendOtp(forgetUserDto, otp);
      return { success:true, message: 'An OTP has been sent to your email address', status: HttpStatus.OK };
    } catch (error) {
      console.error('Error while processing forget password request:', error);
      throw new HttpException('Failed to process forget password request', HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  @Post('verify')
  async verifyOtp(@Body() verifyOtpDto: VerifyOtpDto): Promise<any> {
    try {
      await this.userService.verifyOtp(verifyOtpDto);
      return { success:true,message: 'OTP verified successfully',status: HttpStatus.OK };
    } catch (error) {
      console.error('Error while verifying OTP:', error);
      throw new HttpException('Failed to verify OTP', HttpStatus.INTERNAL_SERVER_ERROR);
    }
    }
    
    @Post('reset')
    async resetPassword(@Body() resetPasswordDto: ResetPasswordDto): Promise<any> {
      try {
        await this.userService.resetPassword(resetPasswordDto);
        return { success:true,message: 'Password reset successfully',status: HttpStatus.OK };
      } catch (error) {
        console.error('Error resetting password:', error);
        throw new HttpException('Failed to reset password', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    } 

  }
 
