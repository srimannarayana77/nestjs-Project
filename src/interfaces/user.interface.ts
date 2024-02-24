import { ObjectId } from "mongoose";

export interface Users {
    name: string;
    user_name: string;
    email: string;
    password: string;
    confirm_password?: string;
    user_type: string;
    phone_number: number;
    otp?: number;
    is_verified?: boolean;
    _id?:string | Object;
  }
  