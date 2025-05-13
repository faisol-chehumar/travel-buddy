import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';
import { TripPlanDto } from './dto/trip-plan.dto';
import { CreateTripDto } from './dto/create-trip.dto';

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [TripsService],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('planTrip', () => {
    it('should return a trip plan', () => {
      const tripPlanDto: TripPlanDto = {
        origin: {
          name: 'Origin Place',
        },
        destination: {
          name: 'Destination Place',
        },
      };

      const result = controller.planTrip(tripPlanDto);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('status', 'planned');
      expect(result).toHaveProperty('origin');
      expect(result).toHaveProperty('destination');
      expect(result.origin.name).toBe('Origin Place');
      expect(result.destination.name).toBe('Destination Place');
    });
  });

  describe('create', () => {
    it('should create a trip', () => {
      const date = new Date();
      const createTripDto: CreateTripDto = {
        name: 'Test Trip',
        startLocation: {
          name: 'Start Place',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End Place',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date,
        userId: 'user123',
      };

      jest.spyOn(service, 'create').mockImplementation((dto) => {
        return {
          id: 'test-id',
          ...dto,
          createdAt: new Date(),
        };
      });

      const result = controller.create(createTripDto);

      expect(result).toHaveProperty('id');
      expect(result.name).toBe('Test Trip');
      expect(result.userId).toBe('user123');
    });
  });
});
