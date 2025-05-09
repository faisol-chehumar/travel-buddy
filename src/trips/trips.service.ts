import { Injectable, NotFoundException } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';
import { CreateTripDto } from './dto/create-trip.dto';
import { UpdateTripDto } from './dto/update-trip.dto';
import { Trip } from './entities/trip.entity';

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
      return this.trips.filter(trip => trip.userId === userId);
    }
    return this.trips;
  }

  findOne(id: string): Trip {
    const trip = this.trips.find(trip => trip.id === id);
    
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    
    return trip;
  }

  update(id: string, updateTripDto: UpdateTripDto): Trip {
    const tripIndex = this.trips.findIndex(trip => trip.id === id);
    
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
    const tripIndex = this.trips.findIndex(trip => trip.id === id);
    
    if (tripIndex === -1) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    
    this.trips.splice(tripIndex, 1);
  }
}