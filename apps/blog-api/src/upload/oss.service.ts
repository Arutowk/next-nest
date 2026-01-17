import { Injectable } from "@nestjs/common";
import OSS from "ali-oss";
import * as path from "path";

@Injectable()
export class OssService {
  private client: OSS;

  constructor() {
    this.client = new OSS({
      region: "oss-cn-chengdu",
      accessKeyId: process.env.ACCESSKEY_ID as string,
      accessKeySecret: process.env.ACCESSKEY_SECRET as string,
      bucket: process.env.MY_BUCKET,
      secure: true, // 如果使用 https
    });
  }

  /**
   * 上传文件到 OSS
   * @param file Express.Multer.File 对象
   * @param folder 指定存储目录
   */
  async uploadFile(file: Express.Multer.File, folder: string = "blog") {
    // 生成唯一文件名：时间戳 + 随机数 + 原后缀
    const filename = `${Date.now()}-${Math.round(Math.random() * 1e9)}${path.extname(file.originalname)}`;
    const targetPath = `${folder}/${filename}`;

    try {
      const result = await this.client.put(targetPath, file.buffer);
      // result.url 是上传后的公网访问地址
      return {
        url: result.url,
        name: result.name,
      };
    } catch (error) {
      throw new Error(`OSS Upload Error: ${error}`);
    }
  }
}
