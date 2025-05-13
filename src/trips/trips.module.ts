import { Module } from '@nestjs/common';
import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';
import { RouteOptimizerService } from './services/route-optimizer.service';

@Module({
  controllers: [TripsController],
  providers: [TripsService, RouteOptimizerService],
  exports: [TripsService],
})
export class TripsModule {}
