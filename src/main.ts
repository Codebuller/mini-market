import { NestFactory } from '@nestjs/core';
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { AppModule } from './app/app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(AppModule,
    new FastifyAdapter({ logger: true })
  );
  const config = new DocumentBuilder()
  .addBearerAuth()
  .setTitle('redis_api')
  .setDescription('Documenattion for redis_api')
  .setVersion('0.1')
  .build()

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);
  await app.listen(3000, '0.0.0.0');
}
bootstrap();
