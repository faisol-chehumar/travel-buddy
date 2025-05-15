import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RouteXlService } from 'src/route-xl/route-xl.service';

import { TripsController } from './trips.controller';
import { TripsService } from './services/trips.service';

@Module({
  imports: [HttpModule],
  controllers: [TripsController],
  providers: [TripsService, RouteXlService],
  exports: [TripsService],
})
export class TripsModule {}
