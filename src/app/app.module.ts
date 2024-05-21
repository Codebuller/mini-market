import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { MariaModule } from 'src/maria/maria.module';
import { RedisModule } from 'src/redis/redis.module';

@Module({
  imports: [ConfigModule.forRoot(), MariaModule, RedisModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
