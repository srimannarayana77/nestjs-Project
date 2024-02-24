import { IsEmail, IsNotEmpty, IsString, MinLength,Validate} from 'class-validator';
import { IsSameAsConstraint } from 'src/helpers/errorValidation';

export class ResetPasswordDto {
  @IsEmail({}, { message: 'Invalid email' })
  @IsNotEmpty({ message: 'Email is required' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'Password is required' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  password: string;

  @Validate(IsSameAsConstraint, ['password'], { message: 'Passwords do not match' })
  @IsString()
  @IsNotEmpty({ message: 'Confirm Password is required' })
  confirm_password: string;
}
