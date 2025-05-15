import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TripsModule } from './trips/trips.module';
import { HealthModule } from './health/health.module';
import { RouteXlModule } from './route-xl/route-xl.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env.local',
    }),
    TripsModule,
    HealthModule,
    RouteXlModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
