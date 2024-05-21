import { Module } from '@nestjs/common';
import { MariaService } from './maria.service';

@Module({
  providers: [MariaService]
})
export class MariaModule {}
