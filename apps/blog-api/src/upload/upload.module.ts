import { Module } from "@nestjs/common";
import { OssService } from "./oss.service";
import { UploadController } from "./upload.controller";

@Module({
  controllers: [UploadController],
  providers: [OssService],
})
export class UploadModule {}
