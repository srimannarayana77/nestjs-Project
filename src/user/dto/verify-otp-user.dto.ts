import { IsNotEmpty, IsNumber, IsEmail } from 'class-validator';

export class VerifyOtpDto {
  @IsNumber()
  @IsNotEmpty({ message: 'OTP is required' })
  otp: number;

  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;
}
