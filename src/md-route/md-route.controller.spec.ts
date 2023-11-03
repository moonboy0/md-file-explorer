import { Test, TestingModule } from '@nestjs/testing';
import { MdRouteController } from './md-route.controller';

describe('MdRouteController', () => {
  let controller: MdRouteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MdRouteController],
    }).compile();

    controller = module.get<MdRouteController>(MdRouteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
