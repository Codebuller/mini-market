import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MariaModule } from 'src/maria/maria.module';
import { RedisModule } from 'src/redis/redis.module';
import { BucketModule } from 'src/bucket/bucket.module';
import { UserModule } from 'src/user/user.module';
import { AuthModule } from 'src/auth/auth.module';
import { ProductModule } from 'src/product/product.module';
import { OrderModule } from 'src/order/order.module';

@Module({
  imports: [ConfigModule.forRoot(), 
    MariaModule, RedisModule,
     BucketModule, UserModule,
    AuthModule, ProductModule,
    OrderModule],
})
export class AppModule {}
