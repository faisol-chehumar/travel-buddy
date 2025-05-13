import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { TripPlanDto } from '../dto/trip-plan.dto';
import { Trip } from '../entities/trip.entity';

@Injectable()
export class TripsService {
  // In-memory storage for trips until we integrate a database
  private trips: Trip[] = [];

  create(createTripDto: CreateTripDto): Trip {
    const newTrip: Trip = {
      id: uuidv4(),
      ...createTripDto,
      createdAt: new Date(),
    };

    this.trips.push(newTrip);
    return newTrip;
  }

  findAll(userId?: string): Trip[] {
    if (userId) {
      return this.trips.filter((trip) => trip.userId === userId);
    }
    return this.trips;
  }

  findOne(id: string): Trip {
    const trip = this.trips.find((trip) => trip.id === id);

    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return trip;
  }

  update(id: string, updateTripDto: UpdateTripDto): Trip {
    const tripIndex = this.trips.findIndex((trip) => trip.id === id);

    if (tripIndex === -1) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

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

    if (tripIndex === -1) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    this.trips.splice(tripIndex, 1);
  }

  planTrip(tripPlanDto: TripPlanDto) {
    // This would eventually integrate with external services like Google Maps API
    // and possibly an AI service for suggestions

    // For now, we'll return a simple response with the origin and destination
    return {
      id: uuidv4(),
      status: 'planned',
      origin: tripPlanDto.origin,
      destination: tripPlanDto.destination,
      date: tripPlanDto.date || new Date().toISOString(),
      estimatedDuration: 60, // Mock duration in minutes
      distance: 10, // Mock distance in kilometers
      createdAt: new Date().toISOString(),
      // In a real application, we would calculate the route and optimize based on
      // traffic, opening hours, etc.
      route: {
        polyline: 'mock_polyline_data',
        steps: [
          {
            instruction: `Start from ${tripPlanDto.origin.name}`,
            distance: 0,
            duration: 0,
          },
          {
            instruction: `Travel to ${tripPlanDto.destination.name}`,
            distance: 10,
            duration: 60,
          },
        ],
      },
      // In a real application, we would get AI-powered suggestions here
      suggestedStops: [
        {
          name: 'Mock Coffee Shop',
          type: 'cafe',
          rating: 4.5,
          distanceFromRoute: 0.2,
        },
        {
          name: 'Mock Restaurant',
          type: 'restaurant',
          rating: 4.2,
          distanceFromRoute: 0.5,
        },
      ],
    };
  }
}
