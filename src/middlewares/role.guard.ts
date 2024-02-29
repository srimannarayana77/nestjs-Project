import { Injectable, CanActivate, ExecutionContext, HttpException, HttpStatus, ForbiddenException, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { configData } from '../config/appConfig.';


@Injectable()
export class RoleGuard implements CanActivate { //CanActivate is used in the RoleGuard to decide the user is allowed to access the url endpoint.
  constructor(private readonly jwtService: JwtService) { }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();//take request object
    const token = request.headers.authorization;

    if (!token) {
      throw new UnauthorizedException({ success: false, message: 'Token is required', statusCode: 401 });
    }

    try {
      let secretKey: any = { secret: configData.secretKey }
      const decodedToken = await this.jwtService.verifyAsync(token, secretKey);
      console.log("decodedToken=", decodedToken)
      const userType = decodedToken.user_type;
      console.log("userType=", userType)
      if (userType !== 'admin' && userType !== 'superAdmin') {
        throw new UnauthorizedException({ success: false, message: 'Access Denied', statusCode: 403 });
      }
      request.user = decodedToken;
      console.log("requestUser=", request.user)
      return true;
    } catch (error) {
      console.log("error while roleguard:", error)
      throw new UnauthorizedException({ success: false, error: error.message, statusCode: 401 });

    }
  }
}
