import { HttpStatus } from "@nestjs/common";
export interface ApiResponse<T> {
    success: boolean;
    message?:string;
    data?: object;
    error?: string;
    status: HttpStatus;
  }
  