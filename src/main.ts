import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { NestExpressApplication } from "@nestjs/platform-express";
import { join } from 'path';
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
global.XMLHttpRequest = require("xhr2").XMLHttpRequest;
async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);
  app.setGlobalPrefix("/api");
  const config = new DocumentBuilder()
    .setTitle('Babylon example')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  app.enableCors();
  app.useStaticAssets(join(__dirname, "..", "public"));
  await app.listen(4000);
}
bootstrap();
