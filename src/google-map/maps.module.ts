import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';
import { ConfigModule } from '@nestjs/config';

import { GooglePlacesService } from './services/google-places.service';

@Module({
  imports: [HttpModule, ConfigModule],
  providers: [GooglePlacesService],
  exports: [GooglePlacesService],
})
export class GoogleMapModule {}
