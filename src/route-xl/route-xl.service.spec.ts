import { Test, TestingModule } from '@nestjs/testing';
import { RouteXlService } from './route-xl.service';

describe('RouteXlService', () => {
  let service: RouteXlService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RouteXlService],
    }).compile();

    service = module.get<RouteXlService>(RouteXlService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
