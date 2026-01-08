import { Database, LayoutDashboard, Users } from "lucide-react";

// --- 模拟页面组件 (实际开发中应动态导入或通过配置映射) ---
const Dashboard = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold mb-4">控制面板</h2>
    <p className="text-slate-500">React 19 Activity 正在后台保持此状态...</p>
    <input
      type="text"
      placeholder="输入些什么测试缓存..."
      className="mt-4 p-2 border rounded"
    />
  </div>
);

const UserList = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold mb-4">用户管理</h2>
    <div className="animate-pulse space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="h-10 bg-slate-100 rounded w-full" />
      ))}
    </div>
  </div>
);

const Inventory = () => (
  <div className="p-6 bg-white rounded-lg shadow-sm border border-slate-200">
    <h2 className="text-xl font-bold mb-4">库存统计</h2>
    <div className="h-40 flex items-end gap-2">
      {[40, 70, 45, 90, 65].map((h, i) => (
        <div
          key={i}
          style={{ height: `${h}%` }}
          className="bg-blue-500 w-8 rounded-t"
        />
      ))}
    </div>
  </div>
);

// --- 配置菜单项 ---
export const MENU_ITEMS = [
  {
    id: "dashboard",
    label: "控制面板",
    icon: LayoutDashboard,
    component: <Dashboard />,
  },
  { id: "users", label: "用户管理", icon: Users, component: <UserList /> },
  {
    id: "inventory",
    label: "库存统计",
    icon: Database,
    component: <Inventory />,
  },
];
