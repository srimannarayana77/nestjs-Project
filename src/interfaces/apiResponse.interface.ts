import { HttpStatus } from "@nestjs/common";
export interface ApiResponse<T> {
    success: boolean;
    message?:string;
  data?: object;
  url?:string
    error?: string;
    status: HttpStatus;
  }
  