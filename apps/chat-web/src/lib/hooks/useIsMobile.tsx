import * as React from "react";

/**
 * 一个用于监听 CSS Media Query 状态的 Hook。
 * @param query - 要检查的 CSS 媒体查询字符串，例如 "(min-width: 768px)"。
 * @returns {boolean} - 如果当前屏幕匹配查询，则返回 true；否则返回 false。
 */
export function useMediaQuery(query: string): boolean {
  // 检查是否在客户端环境（浏览器）
  const isClient = typeof window !== "undefined";

  // 1. 初始化 state
  // 如果是客户端环境，根据当前屏幕状态初始化 state
  const [matches, setMatches] = React.useState(() => {
    if (isClient) {
      return window.matchMedia(query).matches;
    }
    // 服务器端渲染时默认返回 false
    return false;
  });

  // 2. 监听 Media Query 变化
  React.useEffect(() => {
    if (!isClient) {
      return;
    }

    // 创建 Media Query List
    const mediaQueryList = window.matchMedia(query);

    // 定义监听器函数
    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    // 兼容新旧API的添加监听器方法
    if (mediaQueryList.addEventListener) {
      mediaQueryList.addEventListener("change", listener);
    } else {
      // 兼容旧版浏览器
      mediaQueryList.addListener(listener);
    }

    // 3. 清理函数：组件卸载时移除监听器
    return () => {
      if (mediaQueryList.removeEventListener) {
        mediaQueryList.removeEventListener("change", listener);
      } else {
        mediaQueryList.removeListener(listener);
      }
    };
  }, [query, isClient]); // 依赖项：query 变化时重新设置监听

  return matches;
}

/**
 * 检查当前屏幕尺寸是否小于 768px (Tailwind 的 md 断点)。
 * @returns {boolean} - 如果是手机端（小于 768px），则返回 true。
 */
export function useIsMobile() {
  // 监听 "(max-width: 767px)" 表示小于 768px 的屏幕
  return useMediaQuery("(max-width: 767px)");
}
