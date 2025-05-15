import { Test, TestingModule } from '@nestjs/testing';
import { NotFoundException } from '@nestjs/common';
import { TripsService } from './trips.service';

describe('TripsService', () => {
  let service: TripsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TripsService],
    }).compile();

    service = module.get<TripsService>(TripsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  describe('CRUD operations', () => {
    it('should create a trip', () => {
      const createTripDto = {
        name: 'Test Trip',
        startLocation: {
          name: 'Start Place',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End Place',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user123',
      };

      const trip = service.create(createTripDto);
      expect(trip).toHaveProperty('id');
      expect(trip.name).toBe('Test Trip');
    });

    it('should find all trips', () => {
      // Create some test trips
      service.create({
        name: 'Trip 1',
        startLocation: {
          name: 'Start',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user1',
      });

      service.create({
        name: 'Trip 2',
        startLocation: {
          name: 'Start',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user2',
      });

      const allTrips = service.findAll();
      expect(allTrips.length).toBe(2);

      const userTrips = service.findAll('user1');
      expect(userTrips.length).toBe(1);
      expect(userTrips[0].userId).toBe('user1');
    });

    it('should find one trip by id', () => {
      const trip = service.create({
        name: 'Test Trip',
        startLocation: {
          name: 'Start',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user123',
      });

      const foundTrip = service.findOne(trip.id);
      expect(foundTrip).toEqual(trip);
    });

    it('should throw NotFoundException when trip not found', () => {
      expect(() => service.findOne('non-existent-id')).toThrow(
        NotFoundException,
      );
    });

    it('should update a trip', () => {
      const trip = service.create({
        name: 'Test Trip',
        startLocation: {
          name: 'Start',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user123',
      });

      const updatedTrip = service.update(trip.id, { name: 'Updated Trip' });
      expect(updatedTrip.name).toBe('Updated Trip');
    });

    it('should remove a trip', () => {
      const trip = service.create({
        name: 'Test Trip',
        startLocation: {
          name: 'Start',
          coordinates: { latitude: 1, longitude: 1 },
        },
        endLocation: {
          name: 'End',
          coordinates: { latitude: 2, longitude: 2 },
        },
        date: new Date(),
        userId: 'user123',
      });

      service.remove(trip.id);
      expect(() => service.findOne(trip.id)).toThrow(NotFoundException);
    });
  });
});
