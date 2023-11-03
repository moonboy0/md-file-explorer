import { Test, TestingModule } from '@nestjs/testing';
import { MdRouteService } from './md-route.service';

describe('MdRouteService', () => {
  let service: MdRouteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MdRouteService],
    }).compile();

    service = module.get<MdRouteService>(MdRouteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
