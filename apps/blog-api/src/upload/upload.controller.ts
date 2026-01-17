import {
  BadRequestException,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { OssService } from "./oss.service";

@Controller("upload")
export class UploadController {
  constructor(private readonly ossService: OssService) {}

  @Post("image")
  @UseInterceptors(
    FileInterceptor("file", {
      limits: { fileSize: 5 * 1024 * 1024 }, // 限制 5MB
    }),
  ) // 'file' 要对应前端 FormData 的 key
  async uploadImage(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException("请选择要上传的文件");
    }

    // 可以在这里校验文件类型
    if (!file.mimetype.startsWith("image/")) {
      throw new BadRequestException("只能上传图片文件");
    }

    const result = await this.ossService.uploadFile(file, "thumbnail");
    return {
      success: true,
      data: result,
    };
  }
}
