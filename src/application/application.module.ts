import { Module } from '@nestjs/common';
import { ApplicationService } from './application.service';
import { ApplicationController } from './application.controller';
import { MongooseModule } from '@nestjs/mongoose'; //interact with MongoDB using Mongoose within your NestJS application.
import { Application, ApplicationSchema } from '../schemas/application.schema';
import { JwtService } from '@nestjs/jwt';
import { TransactionalEmailsApi } from 'sib-api-v3-sdk'
import { ConfigService } from '@nestjs/config';
@Module({
  imports: [MongooseModule.forFeature([{ name: Application.name, schema: ApplicationSchema }])],
  controllers: [ApplicationController],
  providers: [ApplicationService,JwtService,TransactionalEmailsApi],
})
export class ApplicationModule {}
