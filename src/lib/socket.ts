import { io, Socket } from "socket.io-client";
import { create } from "zustand";

interface SocketStore {
  socket: Socket | null;
  isConnected: boolean;
  connect: (appointmentId: string, token: string) => void;
  disconnect: () => void;
  sendMessage: (content: string) => void;
}

// Match the exact event name from your NestJS implementation
const EVENT_MESSAGE = "message.appointment";

export const useSocket = create<SocketStore>((set, get) => ({
  socket: null,
  isConnected: false,
  connect: (appointmentId: string, token: string) => {
    console.log(
      "Connecting to appointment chat",
      token,
      "------",
      appointmentId
    );

    // Connect to the appointment namespace with correct URL format
    const socket = io(`${process.env.NEXT_PUBLIC_WS_URL}/appointment`, {
      auth: {
        token: `Bearer ${token}`, // Format the token with 'Bearer' prefix
      },
      query: {
        appointment: appointmentId,
      },
      transports: ["websocket"],
      autoConnect: true,
      reconnection: true,
    });

    socket.on("connect", () => {
      console.log("Connected to appointment chat");
      set({ isConnected: true });
    });

    socket.on("disconnect", () => {
      console.log("Disconnected from appointment chat");
      set({ isConnected: false });
    });

    socket.on("connect_error", (error) => {
      console.error("Connection error:", error);
      set({ isConnected: false });
    });

    set({ socket });
  },
  disconnect: () => {
    const { socket } = get();
    if (socket) {
      socket.disconnect();
      set({ socket: null, isConnected: false });
    }
  },
  sendMessage: (content: string) => {
    const { socket } = get();
    if (!socket || !socket.connected) {
      console.error("Cannot send message: socket not connected");
      return;
    }

    // Match the exact message format shown in the screenshot
    socket.emit(EVENT_MESSAGE, { content });
  },
}));
