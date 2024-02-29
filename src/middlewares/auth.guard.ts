import { Injectable, NestMiddleware,HttpException,HttpStatus,CanActivate, ExecutionContext,  UnauthorizedException } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { configData } from 'src/config/appConfig.';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthGuard implements CanActivate {
    constructor(private readonly jwtService: JwtService) {}
    
    async canActivate(context: ExecutionContext): Promise<boolean> {
        try {
            const request = context.switchToHttp().getRequest();
            const token = request.headers.authorization;
            console.log('token=', token);

            if (!token) {
                throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
            }

            let secretKey: any = { secret: configData.secretKey };
            const decode = await this.jwtService.verifyAsync(token, secretKey); 
            request['user'] = decode;

            console.log("req[user]=", request['user']);
            return true;
        } catch (error) {
            console.error('Error in AuthGuard:', error);
            throw new UnauthorizedException({ success: false, message: "Token is expired", statusCode: 422 });
        }
    }
}


// @Injectable()
// export class AuthGuard implements CanActivate {
//     constructor(private readonly jwtService: JwtService) {}
    
//     async canActivate(context: ExecutionContext): Promise<boolean> {
//         const request = context.switchToHttp().getRequest();
//         const token = request.headers.authorization;
//         console.log('token=',token)

//     if (!token) {
//       throw new HttpException('Token not found', HttpStatus.UNAUTHORIZED);
//     }
// let secretKey:any = {secret:configData.secretKey}
//     const decode= await this.jwtService.verifyAsync(token, secretKey); 
//      request['user']=decode

//     console.log("req[user]=",request['user'])
// return true;
// }
// }
