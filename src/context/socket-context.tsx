"use client";

import {
  AppointmentEventConstant,
  NamespaceConstants,
} from "@/core/types/socket-constants";
import React, { createContext, useContext, useEffect, useState } from "react";
import { Socket, io } from "socket.io-client";

interface SocketContextType {
  socket: Socket | null;
  isConnected: boolean;
  messages: Array<{ content: string; senderId: string }>;
  sendMessage: (content: string) => void;
}

interface SocketProviderProps {
  children: React.ReactNode;
  appointmentId: string;
  token: string;
}

const SocketContext = createContext<SocketContextType>({
  socket: null,
  isConnected: false,
  messages: [],
  sendMessage: () => {},
});

export const useSocket = () => {
  const context = useContext(SocketContext);
  if (!context) {
    throw new Error("useSocket must be used within a SocketProvider");
  }
  return context;
};

export const SocketProvider: React.FC<SocketProviderProps> = ({
  children,
  appointmentId,
  token,
}) => {
  const [socket, setSocket] = useState<Socket | null>(null);
  const [isConnected, setIsConnected] = useState(false);
  const [messages, setMessages] = useState<
    Array<{ content: string; senderId: string }>
  >([]);

  useEffect(() => {
    // Create socket connection
    const socketInstance = io(
      `${process.env.NEXT_PUBLIC_WS_URL}/${NamespaceConstants.appointment}`,
      {
        query: {
          appointment: appointmentId,
        },
        extraHeaders: {
          Authorization: `Bearer ${token}`,
        },
        transports: ["websocket"],
        autoConnect: true,
      }
    );

    // Socket event listeners
    socketInstance.on("connect", () => {
      console.log("Connected to WebSocket");
      setIsConnected(true);
    });

    socketInstance.on("disconnect", () => {
      console.log("Disconnected from WebSocket");
      setIsConnected(false);
    });

    socketInstance.on("connect_error", (error) => {
      console.error("Connection error:", error);
      setIsConnected(false);
    });

    // Using the exact event constant from backend
    socketInstance.on(AppointmentEventConstant.message, (data) => {
      setMessages((prev) => [
        ...prev,
        {
          content: data.message,
          senderId: data.senderId, // Assuming the backend sends this
        },
      ]);
    });

    setSocket(socketInstance);

    // Cleanup on unmount
    return () => {
      socketInstance.off(AppointmentEventConstant.message);
      socketInstance.disconnect();
    };
  }, [appointmentId, token]);

  const sendMessage = (content: string) => {
    if (socket && isConnected) {
      socket.emit(AppointmentEventConstant.message, { content });
    }
  };

  const value = {
    socket,
    isConnected,
    messages,
    sendMessage,
  };

  return (
    <SocketContext.Provider value={value}>{children}</SocketContext.Provider>
  );
};
