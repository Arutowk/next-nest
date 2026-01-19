import { TabInstanceContext } from "@/app/admin/page";
import { fetchPostById } from "@/lib/actions/postActions";
import { useQuery } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { use } from "react";
import UpdatePostContainer from "../_component/UpdatePostContainer";

export default function EditBlogPage() {
  const searchParams = useSearchParams();
  const articleId = Number(searchParams.get("id"));
  const thisTabId = use(TabInstanceContext);

  const { data, isLoading } = useQuery({
    // QueryKey 必须包含参数，以区分不同文章的缓存
    queryKey: [
      "blog",
      "edit",
      articleId,
      { tabId: `${thisTabId}_${articleId}` },
    ],
    queryFn: async () => fetchPostById(articleId),
    enabled: !!articleId,
  });

  return (
    <>
      <UpdatePostContainer post={data!} />
    </>
  );
}
