import { TabInstanceContext } from "@/app/admin/page";
import { DataTable } from "@/components/admin/data-table";
import { fetchOss } from "@/lib/oss";
import { useQuery } from "@tanstack/react-query";
import { use } from "react";
import { FileUploadArea } from "./_component/FileUploadArea";
import { columns } from "./columns";

export default function UploadListPage() {
  const thisTabId = use(TabInstanceContext);
  const { data, isLoading, refetch } = useQuery({
    queryKey: ["upload", "list", { tabId: thisTabId }],
    queryFn: async () => fetchOss("thumbnail"),
  });

  return (
    <div className="container mx-auto py-2">
      <FileUploadArea onUploadSuccess={refetch} />
      <DataTable columns={columns} data={data || []} isFetching={isLoading} />
    </div>
  );
}
