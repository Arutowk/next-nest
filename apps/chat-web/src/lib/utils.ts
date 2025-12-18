import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";
import { BACKEND_BASE_URL } from "./default";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

interface RequestOptions<F> extends RequestInit {
  data?: F;
  params?: F;
}

export async function apiRequest<T, F extends Record<string, any> = {}>(
  endpoint: string,
  { params, data, ...customConfig }: RequestOptions<F> = {},
): Promise<T> {
  const headers = { "Content-Type": "application/json" };

  let useMethod = customConfig.method?.toUpperCase() || "GET";
  if (data) {
    useMethod = "POST";
  }

  const config: RequestInit = {
    method: useMethod,
    credentials: "include", // 重要！！！默认携带 Cookie
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  };

  if (!endpoint.startsWith("/")) {
    throw new Error("错误的接口名");
  }

  let url = `${BACKEND_BASE_URL}${endpoint}`;

  if (data) {
    config.body = JSON.stringify(data);
  } else if (params && Object.keys(params).length > 0) {
    const searchParams = new URLSearchParams(params);
    const separator = url.includes("?") ? "&" : "?";
    url = `${url}${separator}${searchParams.toString()}`;
  }

  const response = await fetch(url, config);

  if (!response.ok) {
    const error = await response.json().catch(() => ({ message: "请求失败" }));
    throw new Error(error.message || "网络响应异常");
  }

  return response.json();
}
