import { Module } from '@nestjs/common';
import { PersonalDetailService } from './personal-detail.service';
import { MongooseModule } from '@nestjs/mongoose'; //interact with MongoDB using Mongoose within your NestJS application.
import { PersonalDetailController } from './personal-detail.controller';
import { PersonalDetail,PersonalDetailSchema } from 'src/schemas/personal-detail.schema';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [MongooseModule.forFeature([{ name: PersonalDetail.name, schema:PersonalDetailSchema }])],
  controllers: [PersonalDetailController],
  providers: [PersonalDetailService,JwtService],
})
export class PersonalDetailModule {}
