import { Injectable } from '@nestjs/common';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import { UpdatePersonalDetailDto } from './dto/update-personal-detail.dto';

@Injectable()
export class PersonalDetailService {
  create(createPersonalDetailDto: CreatePersonalDetailDto) {
    return 'This action adds a new personalDetail';
  }

  findAll() {
    return `This action returns all personalDetail`;
  }

  findOne(id: number) {
    return `This action returns a #${id} personalDetail`;
  }

  update(id: number, updatePersonalDetailDto: UpdatePersonalDetailDto) {
    return `This action updates a #${id} personalDetail`;
  }

  remove(id: number) {
    return `This action removes a #${id} personalDetail`;
  }
}
