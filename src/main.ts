import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
global.XMLHttpRequest = require("xhr2").XMLHttpRequest;

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api");
  app.enableCors();
  app.useStaticAssets(join(__dirname, "..", "public"));
  await app.listen(4000);
}
bootstrap();
