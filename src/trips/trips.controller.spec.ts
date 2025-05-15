import { Test, TestingModule } from '@nestjs/testing';
import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';
import { TripPlanDto } from './dto/trip-plan.dto';
import { CreateTripDto } from './dto/create-trip.dto';
import { MapService } from '../maps/services/map.service';

describe('TripsController', () => {
  let controller: TripsController;
  let service: TripsService;

  // Mock MapService
  const mockMapService = {
    createDistanceMatrix: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [TripsController],
      providers: [
        TripsService,
        { provide: MapService, useValue: mockMapService },
      ],
    }).compile();

    controller = module.get<TripsController>(TripsController);
    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  describe('planTrip', () => {
    it('should return a trip plan', async () => {
      const tripPlanDto: TripPlanDto = {
        origin: {
          name: 'Origin Place',
          placeId: '52.3667,4.9000', // Amsterdam
        },
        destination: {
          name: 'Destination Place',
          placeId: '52.0787,4.2888', // The Hague
        },
      };

      // Mock the RouteXL service response
      mockMapService.createDistanceMatrix.mockResolvedValue({
        results: [
          {
            originIndex: 0,
            destinationIndex: 0,
            distanceInMeters: 50000, // 50 km
            durationInSeconds: 3600, // 1 hour
            isRouted: true,
          },
        ],
        sourceLocations: 1,
        destinationLocations: 1,
      });

      // Mock the service's planTrip method to use the real implementation
      // but with our mocked RouteXL service
      jest.spyOn(service, 'planTrip');

      const result = await controller.planTrip(tripPlanDto);

      expect(result).toHaveProperty('id');
      expect(result).toHaveProperty('status', 'planned');
      expect(result).toHaveProperty('origin');
      expect(result).toHaveProperty('destination');
      expect(result.origin.name).toBe('Origin Place');
      expect(result.destination.name).toBe('Destination Place');

      // Verify that the RouteXL service was called with correct parameters
      expect(mockMapService.createDistanceMatrix).toHaveBeenCalled();
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
