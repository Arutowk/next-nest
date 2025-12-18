import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { toNodeHandler } from 'better-auth/node';
import { AppModule } from './app.module';
import { createAuth, getConfig } from './auth';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    bodyParser: false, // Required for Better Auth
  });

  app.enableCors({
    origin: ['http://localhost:3000'],
    credentials: true,
  });

  // https://github.com/better-auth/better-auth/issues/6636
  const express = app.getHttpAdapter().getInstance();
  express.all(/^\/api\/auth\/.*$/, toNodeHandler(createAuth(getConfig())));

  // --- Swagger 配置开始 ---

  // 1. 创建文档配置器
  const config = new DocumentBuilder()
    .setTitle('聊天应用 API 文档') // 您的 API 标题
    .setDescription('用于管理 API 接口和WebSocket') // 您的 API 描述
    .setVersion('1.0') // API 版本
    // 如果您的应用需要认证，可以添加 API Key 或 Bearer Token
    // .addBearerAuth()
    .build();

  // 2. 根据配置创建 Swagger 文档
  const document = SwaggerModule.createDocument(app, config);

  // 3. 设置 Swagger UI 访问路由
  // 文档将通过 http://localhost:3001/api/docs 访问
  SwaggerModule.setup('api/docs', app, document);

  // --- Swagger 配置结束 ---
  //http://localhost:3001/api/auth/reference
  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
