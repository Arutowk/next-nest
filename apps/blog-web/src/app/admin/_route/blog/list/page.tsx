import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { useTabsAction } from "@/hooks/use-admin-tabs";
import { Post } from "blog-api";
import { Pencil } from "lucide-react";
import { columns } from "./columns";

export default function BlogListPage() {
  const { openTab } = useTabsAction();

  const data: Post[] = [
    {
      id: 1,
      title:
        "示例博文-很长的标题用来测试表格的显示效果很长的标题用来测试表格的显示效果",
      thumbnail: "",
      content: "这是一个示例博文的内容。",
      slug: "example-post",
      published: false,
      createdAt: new Date(),
      updatedAt: new Date(),
      publishedAt: null,
      authorId: 1,
    },
    // ...
  ];

  const renderEmptyFallBack = () => {
    return (
      <div className="flex-col">
        <h2>还没有文章，现在就去写一篇？</h2>
        <Button
          onClick={() => openTab("blog_create")}
          className="cursor-pointer mt-2"
        >
          <Pencil />
          <span>前往创作</span>
        </Button>
      </div>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <DataTable
        columns={columns}
        data={[]}
        emptyFallback={renderEmptyFallBack()}
      />
    </div>
  );
}
