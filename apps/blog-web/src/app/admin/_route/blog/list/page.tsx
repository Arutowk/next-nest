import { DataTable } from "@/components/admin/data-table";
import { Button } from "@/components/ui/button";
import { useTabsAction, useTabsState } from "@/hooks/use-admin-tabs";
import { fetchUserPosts } from "@/lib/actions/postActions";
import { DEFAULT_PAGE_SIZE } from "@/lib/constants";
import { useQuery } from "@tanstack/react-query";
import { Pencil } from "lucide-react";
import { columns } from "./columns";

export default function BlogListPage() {
  const { openTab } = useTabsAction();
  const { activeTabId, refreshSignals } = useTabsState();

  const { data, isLoading, refetch } = useQuery({
    queryKey: ["BLOG_LIST", activeTabId, refreshSignals[activeTabId]],
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
      />
    </div>
  );
}
