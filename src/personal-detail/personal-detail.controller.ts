import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { PersonalDetailService } from './personal-detail.service';
import { CreatePersonalDetailDto } from './dto/create-personal-detail.dto';
import { UpdatePersonalDetailDto } from './dto/update-personal-detail.dto';

@Controller('personal-detail')
export class PersonalDetailController {
  constructor(private readonly personalDetailService: PersonalDetailService) {}

  @Post()
  create(@Body() createPersonalDetailDto: CreatePersonalDetailDto) {
    return this.personalDetailService.create(createPersonalDetailDto);
  }

  @Get()
  findAll() {
    return this.personalDetailService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.personalDetailService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updatePersonalDetailDto: UpdatePersonalDetailDto) {
    return this.personalDetailService.update(+id, updatePersonalDetailDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.personalDetailService.remove(+id);
  }
}
