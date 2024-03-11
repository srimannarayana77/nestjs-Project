import { Module } from '@nestjs/common';
// import { AppController } from './app.controller';
// import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { UserModule } from './user/user.module';
import { JobModule } from './job/job.module';
import { ApplicationModule } from './application/application.module';
import configuration from './config/configuration';
import { PersonalDetailModule } from './personal-detail/personal-detail.module'
import { ConfigModule} from '@nestjs/config';
import * as dotenv from 'dotenv'
import { configData } from './config/appConfig.';
 
dotenv.config()


@Module({
  imports: [ConfigModule.forRoot({ load:[configuration]}),MongooseModule.forRoot(configData.db.dbUrl),UserModule, JobModule, ApplicationModule, PersonalDetailModule],
 
  // controllers: [AppController],
  // providers: [AppService],
})

export class AppModule {}
