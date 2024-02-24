import{HttpStatus} from '@nestjs/common'

interface ApiResponse {
    success: boolean;
    message: string;
    status: HttpStatus;
  }