import { BACKEND_URL } from "@/lib/constants";

export async function fetchOss(locate: string) {
  try {
    const response = await fetch(
      `${BACKEND_URL}/upload/list?locate=${locate}`,
      {
        method: "GET",
        credentials: "include",
      },
    );
    const result = (await response.json()) as {
      url: string;
      name: string;
      lastModified: string;
      size: number;
    }[];
    console.log("result:", result);

    return result ?? [];
  } catch (err) {
    console.error("获取列表出错:", err);
  }
}
