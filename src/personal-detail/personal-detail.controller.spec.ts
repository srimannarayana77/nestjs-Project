import { Test, TestingModule } from '@nestjs/testing';
import { PersonalDetailController } from './personal-detail.controller';
import { PersonalDetailService } from './personal-detail.service';

describe('PersonalDetailController', () => {
  let controller: PersonalDetailController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [PersonalDetailController],
      providers: [PersonalDetailService],
    }).compile();

    controller = module.get<PersonalDetailController>(PersonalDetailController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
