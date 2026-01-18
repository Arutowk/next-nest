import { useTabsState } from "@/hooks/use-admin-tabs";
import { type PropsWithChildren, useEffect, useRef, useState } from "react";

type Props = PropsWithChildren<{ title: string; unVisibleHeight?: number }>;

export default function PageNavbar({
  title,
  unVisibleHeight = 100,
  children,
}: Props) {
  // 控制导航栏是否可见的状态
  const [isVisible, setIsVisible] = useState(true);
  // 使用 useRef 来记录上一次的滚动位置，修改它不会触发组件重新渲染，性能更好
  const lastScrollY = useRef(0);

  const { activeTabId } = useTabsState();

  useEffect(() => {
    const container = document.getElementById(
      `scroll-container-${activeTabId}`,
    )!;

    const handleScroll = () => {
      const currentScrollY = container.scrollTop;

      // 核心逻辑：
      // 如果当前滚动位置大于上一次的位置（说明在向下滚动），并且已经离开顶部一定距离（例如 10px，避免在顶部轻微晃动时触发）
      // 则隐藏导航栏。
      // 否则（说明在向上滚动，或者处于页面最顶部），显示导航栏。
      if (
        currentScrollY > lastScrollY.current &&
        currentScrollY > unVisibleHeight
      ) {
        setIsVisible(false);
      } else {
        setIsVisible(true);
      }

      // 更新上一次滚动位置的 ref 值
      lastScrollY.current = currentScrollY;
    };

    // { passive: true } 是一个优化选项，告诉浏览器这个事件处理函数不会调用 preventDefault，可以提升滚动性能
    container.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    // sticky top-0: 基础的粘性定位
    // transition-transform duration-300: 添加 transform 属性的过渡动画，时长 300ms，使隐藏/显示更平滑
    // translate-y-0: 可见时的状态，Y轴位移为0
    // -translate-y-full: 隐藏时的状态，向上位移自身高度的 100%，将其移出屏幕
    <nav
      className={`sticky top-0 z-50 w-full bg-white/90 backdrop-blur-md border-b transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* 左侧：标题 */}
        <div className="shrink-0">
          <h1 className="text-xl font-bold text-gray-900 tracking-tight">
            {title}
          </h1>
        </div>

        {/* 右侧：操作按钮区域 */}
        <div className="flex items-center space-x-2 md:space-x-4">
          {children}
        </div>
      </div>
    </nav>
  );
}
