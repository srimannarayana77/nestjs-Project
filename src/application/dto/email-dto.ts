import { IsEmail } from 'class-validator';

export class EmailDto {
    @IsEmail()
    email: string;
  
    constructor(email: string) {//here we create an object of email 
      this.email = email;
    }
  }