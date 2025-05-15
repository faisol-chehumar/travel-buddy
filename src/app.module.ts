import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { HealthModule } from './health/health.module';
import { RouteXlModule } from './route-xl/route-xl.module';
import { DatabaseModule } from './database/database.module';
import { GoogleMapModule } from './google-map/maps.module';
import { OpenAiModule } from './openai/openai.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    DatabaseModule,
    TripsModule,
    HealthModule,
    RouteXlModule,
    GoogleMapModule,
    OpenAiModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
