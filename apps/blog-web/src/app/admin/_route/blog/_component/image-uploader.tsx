"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { ImagePlus, X, ZoomIn } from "lucide-react";
import Image from "next/image";
import React, { useRef, useState } from "react";

interface ImageUploadProps {
  name: string;
  defaultValue?: string | null; // 初始图片 URL（编辑时用）
}

export function ImageUpload({ name, defaultValue }: ImageUploadProps) {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(
    defaultValue || null,
  );
  const [existingUrl, setExistingUrl] = useState<string | null>(
    defaultValue || null,
  );

  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);

      // 创建预览 URL
      const url = URL.createObjectURL(selectedFile);
      setPreviewUrl(url);
      // 一旦选了新文件，旧图的引用就不重要了，可以清除以减少后端干扰
      setExistingUrl(null);
    }
  };

  // 处理删除
  const handleRemove = () => {
    setFile(null);
    setPreviewUrl(null);
    setExistingUrl(null); // 关键：标记旧图已被删除
    if (fileInputRef.current) {
      fileInputRef.current.value = ""; // 清空 input 的值
    }
  };

  return (
    <div className="space-y-1">
      <div className="flex items-center gap-4">
        {/* 隐藏的真实文件输入框 */}
        <input
          type="file"
          name={name} // 重要：用于原生 FormData 获取数据
          ref={fileInputRef}
          onChange={handleFileChange}
          accept="image/*"
          className="hidden"
        />

        {/* 隐藏的 Input：用于告诉后端旧图是否还在 */}
        <input
          type="hidden"
          name={`existing_${name}`}
          value={existingUrl || ""}
        />

        {previewUrl ? (
          // 预览缩略图
          <div className="relative w-32 h-32 rounded-lg overflow-hidden border bg-muted">
            <Image
              src={previewUrl}
              alt="Upload preview"
              fill
              className="object-cover"
            />
            {/* 悬浮操作按钮 */}
            <div className="absolute inset-0 bg-black/50 opacity-0 hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={() => setPreviewOpen(true)}
              >
                <ZoomIn className="h-4 w-4" />
              </Button>
              <Button
                type="button"
                variant="secondary"
                size="icon"
                className="h-8 w-8"
                onClick={handleRemove}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ) : (
          // 上传占位按钮
          <Button
            type="button"
            variant="outline"
            className="w-32 h-32 border-dashed flex flex-col gap-2"
            onClick={() => fileInputRef.current?.click()}
          >
            <ImagePlus className="h-6 w-6 text-muted-foreground" />
            <span className="text-xs text-muted-foreground">选择图片</span>
          </Button>
        )}
      </div>

      {/* 放大预览弹窗 */}
      <Dialog open={previewOpen} onOpenChange={setPreviewOpen}>
        <DialogContent className="max-w-4xl p-0 overflow-hidden bg-transparent border-none shadow-none">
          <DialogTitle className="sr-only">图片预览</DialogTitle>
          <div className="relative w-full h-[80vh]">
            {previewUrl && (
              <Image
                src={previewUrl}
                alt="Full size preview"
                fill
                className="object-contain"
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}
