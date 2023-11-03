import { Module } from '@nestjs/common';
import { MdRouteService } from './md-route.service';
import { MdRouteController } from './md-route.controller';

@Module({
  providers: [MdRouteService],
  controllers: [MdRouteController]
})
export class MdRouteModule {}
