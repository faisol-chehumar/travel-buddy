import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios';

import { RouteXlService } from './route-xl.service';

@Module({
  imports: [HttpModule],
  providers: [RouteXlService],
})
export class RouteXlModule {}
