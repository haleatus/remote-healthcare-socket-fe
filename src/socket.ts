"use client";

import { io } from "socket.io-client";

const SOCKET_URL = process.env.NEXT_PUBLIC_WS_URL || "http://localhost:8080";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
  reconnectionDelay: 1000,
});

socket.on("connect_error", (error) => {
  console.error("Socket connection error:", error);
});

socket.on("error", (error) => {
  console.error("Socket error:", error);
});
