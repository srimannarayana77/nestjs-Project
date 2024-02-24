import { Module } from '@nestjs/common';
import { PersonalDetailService } from './personal-detail.service';
import { PersonalDetailController } from './personal-detail.controller';

@Module({
  controllers: [PersonalDetailController],
  providers: [PersonalDetailService],
})
export class PersonalDetailModule {}
