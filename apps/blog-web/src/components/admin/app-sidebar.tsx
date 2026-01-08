import { cn } from "@/lib/utils";
import {
  Home,
  Image,
  Moon,
  Palette,
  QrCode,
  ShieldCheck,
  Sun,
  Wallet,
} from "lucide-react";
import { useState } from "react";

const menuItems = [
  { id: "home", icon: Home, label: "Home" },
  { id: "theme", icon: Palette, label: "Theme" },
  { id: "wallet", icon: Wallet, label: "Wallet" },
  { id: "picture", icon: Image, label: "Picture" },
  { id: "qrcode", icon: QrCode, label: "QR Code" },
  { id: "auth", icon: ShieldCheck, label: "Authentication" },
];

const AppSidebar = () => {
  const [activeId, setActiveId] = useState("theme");
  const [isExpanded, setIsExpanded] = useState(false);

  // 演示用的切换函数
  const toggleDarkMode = () =>
    document.documentElement.classList.toggle("dark");

  return (
    <div className="sidebar-container min-h-screen transition-colors duration-500 bg-[#e4e9f5] dark:bg-[#1a1a2e]">
      <aside
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className={`fixed left-0 top-0 h-screen bg-white dark:bg-black transition-all duration-500 pl-2 overflow-hidden z-[9999] group
          ${isExpanded ? "w-[280px]" : "w-[84px]"}
        `}
      >
        <ul className="relative h-full pt-6 flex flex-col gap-1">
          {/* Logo 区域 */}
          <li
            className="mb-10 px-2 cursor-pointer"
            onClick={() => setActiveId("logo")}
          >
            <div className="flex items-center h-[60px]">
              <div className="min-w-[60px] flex justify-center items-center">
                <div className="w-[50px] h-[50px] rounded-full border-2 border-purple-500 dark:border-orange-400 p-0.5 overflow-hidden">
                  <img
                    src="/web-app-manifest-192x192.png"
                    className="w-full h-full rounded-full object-cover"
                    alt="avatar"
                  />
                </div>
              </div>
              <span
                className={`ml-4 text-lg font-bold whitespace-nowrap transition-all duration-300 text-gray-800 dark:text-orange-100
                ${isExpanded ? "opacity-100" : "opacity-0"}`}
              >
                Admin Panel
              </span>
            </div>
          </li>

          {/* 导航项循环 */}
          {menuItems.map(({ id, icon: Icon, label }) => {
            const isActive = activeId === id;
            return (
              <li
                key={id}
                onClick={() => setActiveId(id)}
                className={`group/item cursor-pointer transition-[width] duration-300 ${isActive ? "nav-active" : ""}`}
              >
                <div className="flex items-center h-[64px]">
                  {/* 图标容器 */}
                  <div
                    className={`min-w-[64px] h-[64px] flex justify-center items-center transition-colors
                    ${
                      isActive
                        ? "text-purple-600 dark:text-orange-400"
                        : "text-gray-400 group-hover/item:text-purple-500 dark:group-hover/item:text-orange-400"
                    }
                  `}
                  >
                    {/* 如果是激活状态，给图标加一个圆形外框 (对应图片效果) */}
                    <div
                      className={`flex items-center justify-center rounded-full transition-all duration-500
                      ${isActive ? "w-10 h-10 border-2 border-purple-600 dark:border-orange-400" : ""}`}
                    >
                      <Icon size={24} />
                    </div>
                  </div>

                  {/* 标签文字 */}
                  <span
                    className={`ml-3 font-semibold uppercase tracking-widest whitespace-nowrap transition-all duration-300
                    ${isExpanded ? "opacity-100" : "opacity-0"}
                    ${
                      isActive
                        ? "text-purple-600 dark:text-orange-400"
                        : "text-gray-500 dark:text-gray-400 group-hover/item:text-purple-500 dark:group-hover/item:text-orange-400"
                    }
                  `}
                  >
                    {label}
                  </span>
                </div>
              </li>
            );
          })}

          {/* 底部模式切换按钮 */}
          <li className="mt-auto mb-8 px-4">
            <button
              onClick={toggleDarkMode}
              className={cn(
                "flex items-center justify-center w-full h-12 rounded-xl  text-gray-600 dark:text-orange-300 hover:scale-105 transition-transform",
                isExpanded ? "bg-gray-100 dark:bg-gray-900" : "",
              )}
            >
              <div className="min-w-[32px] flex justify-center items-center">
                <Sun size={20} className="hidden dark:block" />
                <Moon size={20} className="dark:hidden" />
              </div>
              <span
                className={`ml-2 font-medium transition-opacity duration-1000 ${isExpanded ? "opacity-100" : "opacity-0"}`}
              >
                切换主题
              </span>
            </button>
          </li>
        </ul>
      </aside>

      {/* 内容占位 */}
      {/* <main
        className={`transition-all duration-500 p-20 ${isExpanded ? "ml-[280px]" : "ml-[84px]"}`}
      >
        <h1 className="text-6xl font-black text-purple-900/10 dark:text-orange-400/10 uppercase">
          {activeId} Page
        </h1>
      </main> */}
    </div>
  );
};

export default AppSidebar;
