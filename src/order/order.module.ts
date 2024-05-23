import { Module } from '@nestjs/common';
import { OrderController } from './order.controller';
import { OrderService } from './order.service';
import { AuthModule } from 'src/auth/auth.module';
import { MariaModule } from 'src/maria/maria.module';
import { BucketModule } from 'src/bucket/bucket.module';

@Module({
  controllers: [OrderController],
  providers: [OrderService],
  imports: [AuthModule, MariaModule, BucketModule]
})
export class OrderModule {}
