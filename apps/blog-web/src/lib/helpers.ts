import { DEFAULT_PAGE_SIZE } from "./constants";

export function transformTakeSkip({
  page,
  pageSize,
}: {
  page?: number;
  pageSize?: number;
}) {
  return {
    skip: ((page ?? 1) - 1) * (pageSize ?? DEFAULT_PAGE_SIZE),
    take: pageSize ?? DEFAULT_PAGE_SIZE,
  };
}

export function calculatePageNumbers({
  pageNeighbors,
  totalPages,
  currentPage,
}: {
  pageNeighbors: number;
  totalPages: number;
  currentPage: number;
}): Array<number | string> {
  const totalNumbers = pageNeighbors * 2 + 3;
  const totalBlocks = totalNumbers + 2;
  if (totalPages > totalBlocks) {
    const startPage = Math.max(2, currentPage - pageNeighbors);
    const endPage = Math.min(totalPages - 1, currentPage + pageNeighbors);
    let pages: (number | string)[] = Array.from(
      {
        length: endPage - startPage + 1,
      },
      (_, i) => startPage + i,
    );
    if (startPage > 2) pages = ["...", ...pages];
    if (endPage < totalPages - 1) pages = [...pages, "..."];
    return [1, ...pages, totalPages];
  }
  return Array.from({ length: totalPages }).map((_, i) => i + 1);
}

/**
 * 将字节(Byte)转换为易读的格式
 * @param bytes 字节大小
 * @param decimals 精度，保留几位小数
 */
export const formatBytes = (bytes: number, decimals: number = 2): string => {
  if (bytes === 0) return "0 B";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["B", "KB", "MB", "GB", "TB", "PB"];

  // 计算对应的单位索引
  const i = Math.floor(Math.log(bytes) / Math.log(k));

  // 这里的逻辑是：数值 / 1024 的 i 次方
  const result = parseFloat((bytes / Math.pow(k, i)).toFixed(dm));

  return `${result} ${sizes[i]}`;
};
