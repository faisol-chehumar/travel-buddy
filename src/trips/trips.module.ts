import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { MongooseModule } from '@nestjs/mongoose';

import { RouteXlService } from 'src/route-xl/route-xl.service';
import { GoogleMapModule } from 'src/google-map/maps.module';

import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';
import { Trip, TripSchema } from './schemas/trip.schema';

@Module({
  imports: [
    HttpModule,
    GoogleMapModule,
    MongooseModule.forFeature([{ name: Trip.name, schema: TripSchema }]),
  ],
  controllers: [TripsController],
  providers: [TripsService, RouteXlService],
  exports: [TripsService],
})
export class TripsModule {}
