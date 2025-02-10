"use client";

import { useState, useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { IMessageResponse } from "@/core/interface/message.interface";
import { io, Socket } from "socket.io-client";

interface Message {
  id: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

interface ChatClientProps {
  id: string;
  userName: string;
  doctorName: string;
  messageSentByPatient: IMessageResponse;
}

export default function ChatClient({
  id,
  userName,
  doctorName,
  messageSentByPatient,
}: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef<Socket | null>(null);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Initialize socket connection
    socketRef.current = io(
      process.env.NEXT_PUBLIC_SOCKET_URL || "http://localhost:8080",
      {
        query: {
          appointment: id, // Using appointment ID from the URL
        },
      }
    );

    // Socket event handlers
    socketRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("Connected to socket server");
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("Disconnected from socket server");
    });

    socketRef.current.on("message", (message: Message) => {
      setMessages((prevMessages) => [...prevMessages, message]);
      scrollToBottom();
    });

    // Initialize messages from API
    const initializeMessages = () => {
      // Combine messages and sort by timestamp
      const allMessages = [...messageSentByPatient.data].sort(
        (a, b) =>
          new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
      );

      setMessages(allMessages);
      setTimeout(scrollToBottom, 100);
    };

    initializeMessages();

    // Cleanup
    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, [id, messageSentByPatient]);

  const scrollToBottom = () => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      );
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  };

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim() || !socketRef.current) return;

    const messageData = {
      content: newMessage,
    };

    try {
      // Emit the message through socket
      socketRef.current.emit("message", messageData);

      // Clear input
      setNewMessage("");
    } catch (error) {
      console.error("Failed to send message:", error);
    }
  };

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  // Helper function to determine if message is from the patient
  const isPatientMessage = (message: Message) => {
    return messageSentByPatient.data.some((msg) => msg.id === message.id);
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-8 font-sans">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-teal-800">
          Medical Consultation - Application #{id}
        </h1>
        <div className="mt-2 space-y-1">
          <p className="text-gray-600">
            <span className="font-semibold">Patient:</span> {userName}
          </p>
          <p className="text-gray-600">
            <span className="font-semibold">Doctor:</span> {doctorName}
          </p>
          <p className="text-gray-600">
            <span
              className={`inline-block w-2 h-2 rounded-full mr-2 ${
                isConnected ? "bg-green-500" : "bg-red-500"
              }`}
            />
            {isConnected ? "Connected" : "Disconnected"}
          </p>
        </div>
      </div>

      <div className="border rounded-lg p-4 h-[67vh] flex flex-col bg-white shadow-md">
        <ScrollArea className="flex-grow mb-4" ref={scrollAreaRef}>
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={`${message.id}-${message.createdAt}`}
                className={`flex ${
                  isPatientMessage(message) ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    isPatientMessage(message) ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">
                      {isPatientMessage(message) ? userName : doctorName} •{" "}
                      {formatTime(message.createdAt)}
                    </span>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg ${
                        isPatientMessage(message)
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.content}
                    </span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
            disabled={!isConnected}
          />
          <Button
            type="submit"
            className="bg-teal-600 hover:bg-teal-700"
            disabled={!isConnected}
          >
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
