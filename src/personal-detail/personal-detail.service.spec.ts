import { Test, TestingModule } from '@nestjs/testing';
import { PersonalDetailService } from './personal-detail.service';

describe('PersonalDetailService', () => {
  let service: PersonalDetailService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PersonalDetailService],
    }).compile();

    service = module.get<PersonalDetailService>(PersonalDetailService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
