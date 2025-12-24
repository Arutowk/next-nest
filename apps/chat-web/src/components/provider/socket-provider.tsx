"use client";

import { SOCKET_URL } from "@/lib/default";
import React, { createContext, useContext, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";

// 定义连接状态类型
type ConnectionStatus = "connecting" | "connected" | "disconnected" | "error";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  status: ConnectionStatus;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  status: "disconnected",
});

// 导出 Hook，方便其他组件调用
export const useSocket = () => useContext(SocketContext);

export const SocketProvider = ({ children }: { children: React.ReactNode }) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [status, setStatus] = useState<ConnectionStatus>("connecting");

  useEffect(() => {
    // 实例化 Socket
    const socketInstance = io(SOCKET_URL, {
      transports: ["websocket"], // 强制使用 WebSocket，避免轮询延迟
      reconnectionAttempts: 5, // 失败后尝试重连次数
    });

    // 监听连接事件
    socketInstance.on("connect", () => {
      console.log("Socket connected:", socketInstance.id);
      setStatus("connected");
    });

    socketInstance.on("disconnect", (reason) => {
      console.log("Socket disconnected:", reason);
      setStatus("disconnected");
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Socket connection error:", error);
      setStatus("error");
    });

    setSocket(socketInstance);

    // 清理函数：组件卸载（如登出回到登录页）时断开连接
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  const isConnected = status === "connected";

  return (
    <SocketContext.Provider value={{ socket, isConnected, status }}>
      {children}
    </SocketContext.Provider>
  );
};
