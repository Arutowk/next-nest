import { join } from "path";

import { ApolloDriver, ApolloDriverConfig } from "@nestjs/apollo";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { GraphQLModule } from "@nestjs/graphql";
import { Request, Response } from "express";

import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { AuthModule } from "./auth/auth.module";
import { CommentModule } from "./comment/comment.module";
import { LikeModule } from "./like/like.module";
import { PostModule } from "./post/post.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TagModule } from "./tag/tag.module";
import { UploadModule } from "./upload/upload.module";
import { UserModule } from "./user/user.module";

export interface MyContext {
  req: Request;
  res: Response;
}

@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), "src/graphql/schema.gql"),
      context: ({ req, res }: MyContext) => ({ req, res }),
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    PrismaModule,
    UploadModule,
    PostModule,
    UserModule,
    CommentModule,
    TagModule,
    LikeModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
