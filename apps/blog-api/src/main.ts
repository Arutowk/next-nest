import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";

import { AppModule } from "./app.module";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // 开启 CORS
  app.enableCors({
    origin: "http://localhost:4000", // 在生产环境建议设置为具体的域名，如 'https://yourdomain.com'
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE,OPTIONS",
    credentials: true, // 如果你需要跨域传输 Cookie
    allowedHeaders: "Content-Type, Accept, Authorization",
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(8000);
}
bootstrap();
