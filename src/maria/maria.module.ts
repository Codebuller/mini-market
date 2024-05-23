import { Module } from '@nestjs/common';
import { MariaService } from './maria.service';

@Module({
  providers: [MariaService],
  exports:[MariaService]
})
export class MariaModule {}
