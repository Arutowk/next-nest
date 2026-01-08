import { Home, Plus, X } from "lucide-react"; // 使用 lucide-react 作为图标库
import { useState } from "react";

type TabPanelProps = {
  id: string;
  title: string;
  isActive: boolean;
  isLast: boolean;
  onClick: (id: string) => void;
  onClose: (id: string) => void;
};

const TabPanel = ({
  id,
  title,
  isActive,
  onClick,
  onClose,
  isLast,
}: TabPanelProps) => {
  return (
    <div
      onClick={() => onClick(id)}
      className={`relative h-[32px] flex items-center px-6 -ml-3 first:ml-0 cursor-default group transition-all duration-200 ${
        isActive ? "z-30 bg-background " : "z-10 hover:z-20 hover:bg-gray-300"
      }`}
      style={{ width: "200px" }}
    >
      {/* 内容区域 */}
      <div className="relative z-10 flex items-center justify-between w-full px-1 text-sm overflow-hidden">
        <div className="flex items-center gap-2 overflow-hidden">
          <span className="shrink-0 text-gray-500">
            <Home size={14} />
          </span>
          <span
            className={`truncate ${isActive ? "text-gray-900 dark:text-white" : "text-gray-600 dark:text-gray-400"}`}
          >
            {title}
          </span>
        </div>

        {/* 关闭按钮 */}
        <button
          onClick={(e) => {
            e.stopPropagation();
            onClose(id);
          }}
          className={`p-0.5 rounded-full hover:bg-gray-400/30 transition-opacity ${
            isActive ? "opacity-100" : "opacity-0 group-hover:opacity-100"
          }`}
        >
          <X size={12} />
        </button>
      </div>

      {/* 非激活状态下的垂直分隔线 */}
      {!isActive && !isLast && (
        <div className="group-hover:opacity-0 absolute right-0 top-2 bottom-2 w-[1px] bg-gray-400 z-0" />
      )}
    </div>
  );
};

const TabsManager = () => {
  const [tabs, setTabs] = useState([
    { id: "1", title: "控制台" },
    { id: "2", title: "用户管理" },
    { id: "3", title: "系统设置 - 权限分配" },
  ]);
  const [activeTab, setActiveTab] = useState("1");

  const closeTab = (id: string) => {
    const newTabs = tabs.filter((t) => t.id !== id);
    setTabs(newTabs);
    if (activeTab === id && newTabs.length > 0) {
      setActiveTab(newTabs[newTabs.length - 1]?.id!);
    }
  };

  const addTab = () => {
    const newId = Date.now().toString();
    setTabs([...tabs, { id: newId, title: "新页面" }]);
    setActiveTab(newId);
  };

  return (
    <div className="sidebar-container w-fullp-2 pb-0 flex items-end overflow-x-auto no-scrollbar">
      <div className="flex items-end">
        {tabs.map((tab, index) => (
          <TabPanel
            key={tab.id}
            {...tab}
            isActive={activeTab === tab.id}
            isLast={index === tabs.length - 1}
            onClick={setActiveTab}
            onClose={closeTab}
          />
        ))}
      </div>

      {/* 新建标签按钮 */}
      <button
        onClick={addTab}
        className="mb-1.5 ml-2 p-1 rounded-full hover:bg-gray-400/40 text-gray-600 transition-colors"
      >
        <Plus size={18} />
      </button>
    </div>
  );
};

export default TabsManager;
