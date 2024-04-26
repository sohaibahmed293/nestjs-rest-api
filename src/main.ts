import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
// import { MyLoggerService } from './my-logger/my-logger.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    // bufferLogs: true       // enable logger globally
  });
  // app.useLogger(app.get(MyLoggerService))    // enable logger globally
  app.enableCors();
  app.setGlobalPrefix('api');
  await app.listen(3000);
}
bootstrap();
