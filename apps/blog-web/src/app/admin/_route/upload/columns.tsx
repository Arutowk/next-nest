import { formatBytes } from "@/lib/helpers";
import { createColumnHelper } from "@tanstack/react-table";
import dayjs from "dayjs";
import Image from "next/image";

type UploadColumn = {
  name: string;
  url: string;
  lastModified: string;
  size: number;
};

const columnHelper = createColumnHelper<UploadColumn>();

export const columns = [
  columnHelper.accessor("name", { header: "媒体文件" }),
  columnHelper.accessor("url", {
    header: "缩略图",
    cell: (info) => (
      <div>
        <Image
          src={info.getValue() || "public/no-image.png"}
          alt="thumbnail"
          width={100}
          height={100}
        />
      </div>
    ),
  }),
  columnHelper.accessor("lastModified", {
    header: "上传时间",
    cell: (info) => {
      const date = info.getValue();
      return (
        <span className="text-xs">
          {date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "-"}
        </span>
      );
    },
  }),
  columnHelper.accessor("size", {
    header: "大小",
    cell: (info) => formatBytes(info.getValue()),
  }),
];
