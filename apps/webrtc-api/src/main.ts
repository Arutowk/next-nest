import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

import { AppModule } from './app.module';

const httpsOptions = {
  key: fs.readFileSync('./secrets/localhost+1-key.pem'),
  cert: fs.readFileSync('./secrets/localhost+1.pem'),
};

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { httpsOptions });
  app.enableCors();

  const config = new DocumentBuilder()
    .addBearerAuth()
    .setTitle('Todo')
    .setDescription('nest-next的API文档')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(3002);
}
bootstrap();
