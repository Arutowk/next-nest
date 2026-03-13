import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { FileAudio, FileImage, FileVideo } from "lucide-react";
import { useRef, useState } from "react";
import { toast } from "sonner";
// import { uploadToOss } from '@/lib/oss';

export function FileUploadArea({
  onUploadSuccess,
}: {
  onUploadSuccess: () => void;
}) {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFile = async (file: File) => {
    // 校验文件类型
    const validTypes = ["image/", "audio/", "video/"];
    if (!validTypes.some((type) => file.type.startsWith(type))) {
      toast.error("仅支持图片、音频和视频文件");
      return;
    }

    setUploading(true);
    setProgress(0);

    try {
      //  ali-oss 分片上传逻辑
      // const url = await uploadToOss(file, (p) => setProgress(p));

      // 模拟上传过程
      for (let i = 0; i <= 100; i += 10) {
        await new Promise((r) => setTimeout(r, 200));
        setProgress(i);
      }

      toast.success(`${file.name} 上传成功`);
      onUploadSuccess(); // 通知父组件刷新列表
    } catch (error) {
      toast.error("上传失败，请重试");
    } finally {
      setUploading(false);
      setProgress(0);
    }
  };

  return (
    <Card
      className={`border-2 border-dashed transition-colors mb-2 ${
        isDragging
          ? "border-primary bg-primary/5"
          : "border-muted-foreground/20"
      }`}
    >
      <CardContent
        className="flex flex-col items-center justify-center space-y-4 "
        onDragOver={(e) => {
          e.preventDefault();
          setIsDragging(true);
        }}
        onDragLeave={() => setIsDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setIsDragging(false);
          if (e.dataTransfer.files?.[0]) handleFile(e.dataTransfer.files[0]);
        }}
      >
        <div className="flex space-x-4 text-muted-foreground">
          <FileImage className="w-8 h-8" />
          <FileAudio className="w-8 h-8" />
          <FileVideo className="w-8 h-8" />
        </div>

        <div className="text-center">
          <p className="text-sm font-medium">
            {uploading ? "正在上传..." : "点击或拖拽文件至此处上传"}
          </p>
          <p className="text-xs text-muted-foreground mt-1">
            支持图片、音频、视频 (最大 100MB)
          </p>
        </div>

        {!uploading ? (
          <Button
            variant="outline"
            onClick={() => fileInputRef.current?.click()}
          >
            选择文件
          </Button>
        ) : (
          <div className="w-full max-w-xs space-y-2">
            <Progress value={progress} className="h-2" />
            <p className="text-xs text-center text-muted-foreground">
              {progress}%
            </p>
          </div>
        )}

        <input
          type="file"
          ref={fileInputRef}
          hidden
          accept="image/*,audio/*,video/*"
          onChange={(e) => e.target.files?.[0] && handleFile(e.target.files[0])}
        />
      </CardContent>
    </Card>
  );
}
