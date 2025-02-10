/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState, useEffect, useRef } from "react";

import { Send, Paperclip, CheckCheck, AlertCircle } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useSocket } from "@/context/socket-context";

export default function MedicalChat() {
  const { messages, sendMessage, isConnected } = useSocket();
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (newMessage.trim()) {
      sendMessage(newMessage);
      setNewMessage("");
    }
  };

  const formatTime = (date: any) => {
    return new Date(date).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="hidden md:flex md:w-64 flex-col bg-white border-r">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold text-gray-800">Recent Chats</h2>
        </div>
        <ScrollArea className="flex-1 p-3">
          <div className="space-y-2">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition-colors"
              >
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 rounded-full bg-teal-100 flex items-center justify-center">
                    <span className="text-teal-600 font-medium">{`P${i}`}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-gray-900 truncate">
                      Patient #{i}
                    </p>
                    <p className="text-xs text-gray-500 truncate">
                      Last message...
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Chat Header */}
        <div className="bg-white border-b px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 rounded-full bg-teal-100 flex items-center justify-center">
                <span className="text-teal-600 font-medium">P1</span>
              </div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900">
                  Medical Consultation
                </h3>
                <div className="flex items-center space-x-2 text-sm text-gray-500">
                  <span
                    className={`w-2 h-2 rounded-full ${
                      isConnected ? "bg-green-500" : "bg-red-500"
                    }`}
                  />
                  <span>{isConnected ? "Connected" : "Disconnected"}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages Area */}
        <ScrollArea className="flex-1 p-6">
          <div className="space-y-4">
            {!isConnected && (
              <Alert variant="destructive" className="mb-4">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>
                  Connection lost. Trying to reconnect...
                </AlertDescription>
              </Alert>
            )}

            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${
                  message.isPatient ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[70%] ${
                    message.isPatient ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex flex-col space-y-1">
                    <div
                      className={`px-4 py-2 rounded-lg ${
                        message.isPatient
                          ? "bg-teal-500 text-white"
                          : "bg-gray-100 text-gray-900"
                      }`}
                    >
                      {message.content}
                    </div>
                    <div
                      className={`flex items-center space-x-2 text-xs text-gray-500 ${
                        message.isPatient ? "justify-end" : "justify-start"
                      }`}
                    >
                      <span>{formatTime(message.createdAt)}</span>
                      <CheckCheck className="h-3 w-3" />
                    </div>
                  </div>
                </div>
              </div>
            ))}
            <div ref={scrollRef} />
          </div>
        </ScrollArea>

        {/* Input Area */}
        <div className="bg-white border-t p-4">
          <form onSubmit={handleSubmit} className="flex space-x-4">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="flex-none"
            >
              <Paperclip className="h-5 w-5 text-gray-500" />
            </Button>
            <Input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message..."
              className="flex-1"
              disabled={!isConnected}
            />
            <Button
              type="submit"
              disabled={!isConnected}
              className="bg-teal-500 hover:bg-teal-600 text-white"
            >
              <Send className="h-5 w-5" />
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
