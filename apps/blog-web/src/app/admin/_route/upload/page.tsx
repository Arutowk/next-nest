import { TabInstanceContext } from "@/app/admin/page";
import { DataTable } from "@/components/admin/data-table";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { fetchOss } from "./api";
import { columns } from "./columns";

export default function UploadListPage() {
  const thisTabId = use(TabInstanceContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["upload", "list", { tabId: thisTabId }],
    queryFn: async () => fetchOss("thumbnail"),
  });

  return (
    <div className="container mx-auto py-10">
      <DataTable columns={columns} data={data || []} isFetching={isLoading} />
    </div>
  );
}
