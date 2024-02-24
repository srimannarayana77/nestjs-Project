import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as dotenv from 'dotenv'
import { configData } from './config/appConfig.';
import { ValidationPipe, UnprocessableEntityException } from '@nestjs/common';

dotenv.config()

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({ //used for request  validation.
      exceptionFactory: (errors) => { //expectionFactory  customizes the format of validation errors thrown by the pipe.
        const result = {};
        errors.forEach((error) => {
          result[error.property] = Object.values(error.constraints)[0];
        });
        return new UnprocessableEntityException({sucess:false,message:"Validation Failed", errors: result,status:422 }); //BadRequestException will be thrown when there are validation errors in the request
      },
      stopAtFirstError: true,//validation will stop after first error is coming  in the request .
    }),
  );

  await app.listen(configData.port);
}
bootstrap();
