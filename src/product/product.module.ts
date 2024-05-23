import { Module } from '@nestjs/common';
import { ProductService } from './product.service';
import { MariaModule } from 'src/maria/maria.module';
import { ProductController } from './product.controller';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  providers: [ProductService],
  imports:[MariaModule, RedisModule],
  controllers: [ProductController]
})
export class ProductModule {}
