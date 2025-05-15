import { Injectable, NotFoundException, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';

import { RouteXlService } from 'src/route-xl/route-xl.service';
import { RouteXlLocation } from 'src/route-xl/interfaces';
import { GooglePlacesService } from 'src/google-map/services/google-places.service';
import { OpenAiService } from 'src/openai/services/openai.service';

import { CreateTripDto } from '../dto/create-trip.dto';
import { UpdateTripDto } from '../dto/update-trip.dto';
import { Trip, TripDocument } from '../schemas/trip.schema';
import { QueryOneDayPlanDto } from '../dto';
import { TripLocation } from 'src/openai/interfaces';
import { LocationDto } from '../dto/location.dto';

export interface MappedTripLocation {
  name: string;
  description: string;
  coordinates: {
    latitude: number;
    longitude: number;
  };
  duration?: number;
  province: string;
  district: string;
}

@Injectable()
export class TripsService {
  private readonly logger = new Logger(TripsService.name);

  constructor(
    @InjectModel(Trip.name) private tripModel: Model<TripDocument>,
    private readonly routeXl: RouteXlService,
    private readonly googlePlacesService: GooglePlacesService,
    private readonly openAiService: OpenAiService,
  ) {}

  async create(createTripDto: CreateTripDto): Promise<Trip> {
    const allLocations = [
      createTripDto.startLocation,
      ...createTripDto.tripLocation,
      createTripDto.endLocation,
    ];

    const placeNames = allLocations.map(
      (l) => `${l.name}, ${l.district}, ${l.province}`,
    );

    const mapLatLngTripLocation =
      await this.googlePlacesService.searchMultiplePlaces(placeNames);

    console.log('mapLatLngTripLocation', mapLatLngTripLocation);

    const tripLocations = mapLatLngTripLocation.map((m, index) => ({
      name: allLocations[index].name,
      description: allLocations[index].short_description,
      coordinates: {
        latitude: m.places[0].location.latitude,
        longitude: m.places[0].location.longitude,
      },
      district: allLocations[index].district,
      province: allLocations[index].province,
    })) as MappedTripLocation[];

    const optimizedTripRoute = await this.routeXl.getOptimizeRoute({
      locations: this.mapToRouteXlLocations(tripLocations),
    });

    const routeLocation = this.mapToTripLocations(
      optimizedTripRoute.route,
      tripLocations,
    );

    const createdTrip = new this.tripModel({
      ...createTripDto,
      tripLocation: routeLocation,
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

  async getOneDayPlan(
    queryOneDayPlanDto: QueryOneDayPlanDto,
  ): Promise<TripLocation[]> {
    const { startPlace, destinationPlace } = queryOneDayPlanDto;

    const tripLocations = await this.openAiService.generateOneDayTripLocation(
      startPlace,
      destinationPlace,
    );

    return tripLocations;
  }

  private mapToRouteXlLocations(
    locations: MappedTripLocation[],
  ): RouteXlLocation[] {
    const mapLocations: RouteXlLocation[] =
      locations?.map((s) => ({
        address: s.name,
        lat: s.coordinates.latitude,
        lng: s.coordinates.longitude,
      })) ?? [];

    return mapLocations;
  }

  private mapToTripLocations(
    optimizedTripRoute: Record<string, { name: string }>,
    originalTripLocations: LocationDto[],
  ): LocationDto[] {
    return Object.values(optimizedTripRoute).reduce<LocationDto[]>(
      (acc, routeItem) => {
        const found = originalTripLocations.find(
          (location) => location.name === routeItem.name,
        );
        if (found) {
          acc.push({
            name: found.name,
            district: found.district,
            province: found.province,
            coordinates: {
              latitude: found.coordinates?.latitude,
              longitude: found.coordinates?.longitude,
            },
          });
        }
        return acc;
      },
      [],
    );
  }
}
