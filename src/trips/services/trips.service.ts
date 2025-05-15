import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

import { RouteXlService } from 'src/route-xl/route-xl.service';
import { Location } from 'src/route-xl/interfaces';

import { CreateTripDto, LocationDto, StopDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { Trip } from '../entities/trip.entity';

@Injectable()
export class TripsService {
  // In-memory storage for trips until we integrate a database
  private trips: Trip[] = [];

  constructor(private readonly routeXl: RouteXlService) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const optimizedRoute = await this.routeXl.getOptimizeRoute({
      locations: this.mapToRouteXlLocations(
        createTripDto.startLocation,
        createTripDto.stops,
        createTripDto.endLocation,
      ),
    });

    const routeLocation = this.mapToTripStops(
      optimizedRoute.route,
      createTripDto.stops,
    );

    const newTrip: Trip = {
      id: uuidv4(),
      ...createTripDto,
      stops: routeLocation,
      createdAt: new Date(),
    };
    this.trips.push(newTrip);

    return newTrip;
  }

  findAll(userId?: string): Trip[] {
    return userId
      ? this.trips.filter((trip) => trip.userId === userId)
      : this.trips;
  }

  findOne(id: string): Trip {
    const trip = this.trips.find((trip) => trip.id === id);
    if (!trip) throw new NotFoundException(`Trip with ID ${id} not found`);
    return trip;
  }

  update(id: string, updateTripDto: UpdateTripDto): Trip {
    const tripIndex = this.trips.findIndex((trip) => trip.id === id);
    if (tripIndex === -1)
      throw new NotFoundException(`Trip with ID ${id} not found`);

    const updatedTrip = {
      ...this.trips[tripIndex],
      ...updateTripDto,
      updatedAt: new Date(),
    };

    this.trips[tripIndex] = updatedTrip;
    return updatedTrip;
  }

  remove(id: string): void {
    const tripIndex = this.trips.findIndex((trip) => trip.id === id);
    if (tripIndex === -1)
      throw new NotFoundException(`Trip with ID ${id} not found`);
    this.trips.splice(tripIndex, 1);
  }

  private mapToRouteXlLocations(
    start: LocationDto,
    stops: StopDto[],
    end: LocationDto,
  ): Location[] {
    const startLocation: Location = {
      address: start.name,
      lat: start.coordinates.latitude,
      lng: start.coordinates.longitude,
    };

    const endLocation: Location = {
      address: end.name,
      lat: end.coordinates.latitude,
      lng: end.coordinates.longitude,
    };

    const stopLocations: Location[] =
      stops?.map((s) => ({
        address: s.name,
        lat: s.coordinates.latitude,
        lng: s.coordinates.longitude,
      })) ?? [];

    return [startLocation, ...stopLocations, endLocation];
  }

  private mapToTripStops(
    optimizedRoute: Record<string, { name: string }>,
    originalStops: StopDto[],
  ): LocationDto[] {
    return Object.values(optimizedRoute).reduce<LocationDto[]>(
      (acc, routeItem) => {
        const found = originalStops.find(
          (location) => location.name === routeItem.name,
        );
        if (found) {
          acc.push({
            name: found.name,
            coordinates: {
              latitude: found.coordinates.latitude,
              longitude: found.coordinates.longitude,
            },
          });
        }
        return acc;
      },
      [],
    );
  }
}
