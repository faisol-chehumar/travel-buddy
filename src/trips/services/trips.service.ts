import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RouteXlService } from 'src/route-xl/route-xl.service';
import { Location } from 'src/route-xl/interfaces';
import { GooglePlacesService } from 'src/google-map/services/google-places.service';

import { CreateTripDto, LocationDto, StopDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { Trip, TripDocument } from '../schemas/trip.schema';
import { CreateOneDayPlanDto } from '../dto';

@Injectable()
export class TripsService {
  private readonly logger = new Logger(TripsService.name);

  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private readonly routeXl: RouteXlService,
    private readonly googlePlacesService: GooglePlacesService,
  ) {}

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

    const createdTrip = new this.tripModel({
      ...createTripDto,
      stops: routeLocation,
    });

    return createdTrip.save();
  }

  async findAll(userId?: string): Promise<Trip[]> {
    if (userId) {
      return this.tripModel.find({ userId }).exec();
    }
    return this.tripModel.find().exec();
  }

  async findOne(id: string): Promise<Trip> {
    const trip = await this.tripModel.findById(id).exec();
    if (!trip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
    return trip;
  }

  async update(id: string, updateTripDto: UpdateTripDto): Promise<Trip> {
    const updatedTrip = await this.tripModel
      .findByIdAndUpdate(id, updateTripDto, { new: true })
      .exec();

    if (!updatedTrip) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }

    return updatedTrip;
  }

  async remove(id: string): Promise<void> {
    const result = await this.tripModel.findByIdAndDelete(id).exec();

    if (!result) {
      throw new NotFoundException(`Trip with ID ${id} not found`);
    }
  }

  async createOneDayPlan(
    createOneDayPlanDto: CreateOneDayPlanDto,
  ): Promise<void> {}

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
