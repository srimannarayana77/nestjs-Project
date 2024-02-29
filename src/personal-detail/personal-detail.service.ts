import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model,ObjectId } from 'mongoose';
import { User } from 'src/schemas/user.schema';
import { PersonalDetail } from '../schemas/personal-detail.schema';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import { UpdatePersonalDetailDto } from './dto/update-personal-detail.dto';

@Injectable()
export class PersonalDetailService {
  constructor(
    @InjectModel(PersonalDetail.name) private personalDetailModel: Model<PersonalDetail>,
  ) {}

  async create(createPersonalDetailDto: CreatePersonalDetailDto): Promise<PersonalDetail> {
    const createdPersonalDetail = new this.personalDetailModel(createPersonalDetailDto);
    return createdPersonalDetail.save();
  }

  async findByUserId( user_id:string): Promise<PersonalDetail | null> {
    return this.personalDetailModel.findOne({ user_id }).exec();
  }

  async update(user_id: string, updatePersonalDetailDto: UpdatePersonalDetailDto): Promise<PersonalDetail | null> {
    return this.personalDetailModel.findOneAndUpdate({ user_id }, updatePersonalDetailDto, { new: true }).exec();
  }
}
