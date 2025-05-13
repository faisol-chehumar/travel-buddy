import { Test, TestingModule } from '@nestjs/testing';
import { HealthService } from './health.service';

describe('HealthService', () => {
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [HealthService],
    }).compile();

    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return health check information', () => {
    const result = service.check();

    expect(result).toHaveProperty('status', 'ok');
    expect(result).toHaveProperty('timestamp');
    expect(result).toHaveProperty('uptime');
    expect(result).toHaveProperty('memoryUsage');
  });
});
