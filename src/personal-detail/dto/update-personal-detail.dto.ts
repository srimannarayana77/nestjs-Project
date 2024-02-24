import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonalDetailDto } from './create-personal-detail.dto';

export class UpdatePersonalDetailDto extends PartialType(CreatePersonalDetailDto) {}
