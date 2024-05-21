import { Test, TestingModule } from '@nestjs/testing';
import { MariaService } from './maria.service';

describe('MariaService', () => {
  let service: MariaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MariaService],
    }).compile();

    service = module.get<MariaService>(MariaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
