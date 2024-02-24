import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';// inject a User model into the authenticationService using the @InjectModel() decorator
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { SignInUserDto } from './dto/signin-user-dto';
import { VerifyOtpDto } from './dto/verify-otp-user.dto';
import { ResetPasswordDto } from './dto/reset-user.dto';
import { Model } from 'mongoose';
import { HashService } from '../helpers/hash';
import { ForgetUserDto } from './dto/forget-user.dto';
import * as nodemailer from 'nodemailer';
import { User, UserDocument } from '../schemas/user.schema';

@Injectable()
export class UserService { //UserService is decorated with @Injectable() to indicate that it is a provider that may have dependencies
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    private readonly hashService: HashService
    ) {}// This means that userModel is an instance of the Mongoose model associated with the User schema, UserService  interact with the User model in the database using the Mongoose model.

  async create(createUserDto: CreateUserDto): Promise<User> {
    const [hashedPassword, hashedConfirmPassword] = await this.hashService.hashPasswords(createUserDto.password);
    createUserDto.password = hashedPassword;
    
    const createdUser = new this.userModel(createUserDto);
    return createdUser.save();
  }
  async emailExists(email: string): Promise<boolean> {
    const user = await this.userModel.findOne({ email }).exec();
    return !!user;
  }
  async usernameExists(user_name: string): Promise<boolean> {
    const user = await this.userModel.findOne({ user_name }).exec();
    return !!user;
  }

  async findAll(): Promise<User[]> { 
      return this.userModel.find().exec();
  }

  async findUserByEmailOrUsername(signInUserDto: SignInUserDto): Promise<User | null> {
    const { email, user_name } = signInUserDto;

    if (email) {
      return await this.userModel.findOne({ email }).exec();
    } else if (user_name) {
      return await this.userModel.findOne({ user_name }).exec();
    }

    return null;
  }

  async getUserById(userId: string): Promise<User | null> {
    return await this.userModel.findById(userId).exec();
  }
 
  async updateUserById(updateUserDto:UpdateUserDto,userId:any) {
    const hashedPassword:any = await this.hashService.hashPasswords(updateUserDto.password);
     console.log('hash=',hashedPassword)
    updateUserDto.password = hashedPassword;

    const updatedUser =  await this.userModel.findByIdAndUpdate(userId,updateUserDto ,{ new: true }); 
    return updatedUser
  }

  async deleteUserById(userId: string): Promise<User | null> {
      const deletedUser = await this.userModel.findByIdAndDelete(userId).exec();
      return deletedUser;
  }
  
  async generateOtp(forgetUserDto: ForgetUserDto): Promise<string> {
    const { email } = forgetUserDto;
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    await this.userModel.findOneAndUpdate({ email }, { otp });
  
    return otp;
  }
  

  async sendOtp(forgetUserDto: ForgetUserDto, otp: string): Promise<void> {
    try {
      const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
          user: 'sriman793@gmail.com', 
          pass: 'ceqk egqz moiv vmxv', 
        },
      });

      const mailOptions = {
        from: 'sriman793@gmail.com', 
        to: forgetUserDto.email,
        subject: 'Password Reset OTP',
        text: `Your OTP for password reset is: ${otp}`,
      };

      await transporter.sendMail(mailOptions);
      console.log('OTP sent successfully');
    } catch (error) {
      console.error('Error sending OTP:', error);
      throw new Error('Failed to send OTP');
    }
  }

  async verifyOtp(verifyOtpDto: VerifyOtpDto): Promise<void> {
    const { otp, email } = verifyOtpDto;
    const user = await this.userModel.findOne({ email });
      // if (!user) {
      //   throw new NotFoundException('User not found');
      // }
      const storedOtp = await this.userModel.findOne({ otp }).sort({ createdAt: -1 });

      // if (!storedOtp) {
      //   throw new NotFoundException('OTP not found');
      // }

      // if (storedOtp.otp !== otp) {
      //   throw new NotFoundException('Invalid OTP');
      // }

      user.is_verified = true;
      await user.save();

      storedOtp.is_verified = true;
      await storedOtp.save();
  }

  async resetPassword(resetPasswordDto: ResetPasswordDto): Promise<void> {
    const { email, password, confirm_password } = resetPasswordDto;

    // if (password !== confirmPassword) {
    //   throw new NotFoundException('Passwords do not match');
    // }

    const user = await this.userModel.findOne({ email });
    
    const storedOtp = await this.userModel.findOne({ email }).sort({ createdAt: -1 });

    // if (!storedOtp || !storedOtp.is_verified) {
    //   throw new NotFoundException('Email is not verified');
    // }
    // if (!user) {
    //   throw new NotFoundException('User not found');
    // }
    const hashedPassword = await this.hashService.hashPasswords(password);
    const hashedConfirmPassword = await this.hashService.hashPasswords(confirm_password);

    user.password = hashedPassword;
    user.confirm_password = hashedConfirmPassword
    await user.save();
  }
}
