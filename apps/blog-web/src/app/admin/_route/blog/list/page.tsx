import { TabInstanceContext } from "@/app/admin/page";
import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { useTabsAction } from "@/hooks/use-admin-tabs";
import { fetchUserPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { use } from "react";
import { columns } from "./columns";

export default function BlogListPage() {
  const { openTab } = useTabsAction();
  const thisTabId = use(TabInstanceContext);

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["blog", "list", { tabId: thisTabId }],
    queryFn: async () =>
      fetchUserPosts({ page: 1, pageSize: DEFAULT_PAGE_SIZE }),
  });

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
        data={data?.posts || []}
        emptyFallback={renderEmptyFallBack()}
        isFetching={isLoading}
      />
    </div>
  );
}
