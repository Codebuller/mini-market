import { Module } from '@nestjs/common';
import { BucketController } from './bucket.controller';
import { BucketService } from './bucket.service';
import { MariaModule } from 'src/maria/maria.module';
import { RedisModule } from 'src/redis/redis.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  controllers: [BucketController],
  providers: [BucketService],
  exports:[BucketService],
  imports: [MariaModule, RedisModule, AuthModule ],
})
export class BucketModule {}
