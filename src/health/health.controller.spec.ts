import { Test, TestingModule } from '@nestjs/testing';
import { HealthController } from './health.controller';
import { HealthService } from './health.service';

describe('HealthController', () => {
  let controller: HealthController;
  let service: HealthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [HealthController],
      providers: [HealthService],
    }).compile();

    controller = module.get<HealthController>(HealthController);
    service = module.get<HealthService>(HealthService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should return health status', () => {
    const result = {
      status: 'ok',
      timestamp: new Date().toISOString(),
      uptime: 123,
      memoryUsage: {
        rss: 12345,
        heapTotal: 54321,
        heapUsed: 12345,
        external: 123,
        arrayBuffers: 123,
      },
    };

    const checkSpy = jest
      .spyOn(service, 'check')
      .mockImplementation(() => result);

    expect(controller.check()).toEqual(result);
    expect(checkSpy).toHaveBeenCalled();
  });
});
