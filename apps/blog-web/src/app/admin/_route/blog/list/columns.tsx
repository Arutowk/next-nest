"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Post } from "blog-api";
import dayjs from "dayjs";
import {
  Check,
  Delete,
  Eye,
  MoreHorizontal,
  Paperclip,
  Pencil,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const columnHelper = createColumnHelper<Post>();

export const columns = [
  columnHelper.accessor("id", { header: "ID" }),
  columnHelper.accessor("title", {
    header: "标题",
    cell: (info) => (
      <div className="max-w-80 truncate" title={info.getValue()}>
        {info.getValue()}
      </div>
    ),
  }),
  columnHelper.accessor("thumbnail", { header: "缩略图" }),
  columnHelper.accessor("published", {
    header: "发布状态",
    cell: (info) => {
      const published = info.getValue();
      return (
        <div className="flex items-center gap-2">
          {published ? (
            <>
              <Check size={14} />
              <span>已发布</span>
            </>
          ) : (
            <>
              <Paperclip size={14} />
              <span>待发布</span>
            </>
          )}
        </div>
      );
    },
  }),
  columnHelper.accessor("publishedAt", {
    header: "发布时间",
    cell: (info) => {
      const date = info.getValue();
      return (
        <span className="text-xs">
          {date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "-"}
        </span>
      );
    },
  }),
  columnHelper.accessor("createdAt", {
    header: "创建时间",
    cell: (info) => {
      const date = info.getValue();
      return (
        <span className="text-xs">
          {date ? dayjs(date).format("YYYY-MM-DD HH:mm:ss") : "-"}
        </span>
      );
    },
  }),
  columnHelper.display({
    id: "actions",
    header: "操作",
    cell: ({ row }) => {
      const blog = row.original;
      return (
        <div className="flex gap-1">
          <Button variant="outline" className="h-8" title="Edit">
            <Pencil className="h-4 w-4" />
          </Button>
          <Button variant="outline" className="h-8" title="View">
            <Eye className="h-4 w-4" />
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Actions</DropdownMenuLabel>
              <DropdownMenuItem
                onClick={() => navigator.clipboard.writeText(blog.title)}
              >
                Copy blog title
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem className="text-destructive">
                <Delete />
                <span>Delete</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      );
    },
  }),
];
