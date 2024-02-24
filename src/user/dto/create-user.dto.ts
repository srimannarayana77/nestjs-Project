import { IsString,IsEmail, MinLength,IsEnum, IsNotEmpty,IsNumber, IsAlpha,Validate } from 'class-validator';
// import { IsSameAsConstraint } from 'src/helpers/errorValidation';
// import { UserService } from 'src/user/user.service';
// import { IsUniqueEmailConstraint } from 'src/helpers/errorValidation';

export class CreateUserDto {
  @IsAlpha('en-US',{message:'Invalid Name'})
  @IsString()
  @IsNotEmpty({ message: 'name is required' })
  name: string;

  @IsString()
  @IsNotEmpty({ message: 'username is required' })
  user_name: string;

  @IsEmail()
  @IsNotEmpty({ message: 'email is required' })
  email: string;

  @MinLength(8)
  @IsString()
  @IsNotEmpty({ message: 'password is required' })
  password: string;

  // @Validate(IsSameAsConstraint, ['password'], { message: 'Passwords do not match' })
  confirm_password?: string;

  @IsEnum(['admin', 'superAdmin', 'user'])
  @IsNotEmpty({ message: 'usertype is required' }) 
  user_type: string;
  
  @IsNumber({}, { message: 'Phone number must be a number' })
  @IsNotEmpty({ message: 'phonenumber is required' }) 
  phone_number: number;
   
}

