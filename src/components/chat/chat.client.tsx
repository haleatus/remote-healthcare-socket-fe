"use client";

import type React from "react";
import { useEffect, useRef, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, UserCircle2, Stethoscope } from "lucide-react";
import type { IMessage } from "@/core/interface/message.interface";
import Image from "next/image";
import { useSocket } from "@/lib/socket";
import { cn } from "@/lib/utils";

const ChatClient = ({
  id,
  accessToken,
  messagesForApplication,
  ifDoctor,
}: {
  id: string;
  accessToken: string;
  messagesForApplication: IMessage[];
  ifDoctor: boolean;
}) => {
  const { socket, connect, disconnect, isConnected, sendMessage } = useSocket();
  const [messages, setMessages] = useState<IMessage[]>(
    messagesForApplication || []
  );
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);
  const pendingMessageRef = useRef<string | null>(null);

  useEffect(() => {
    connect(id, accessToken);
    return () => disconnect();
  }, [id, accessToken, connect, disconnect]);

  useEffect(() => {
    if (!socket) return;

    socket.on("message.appointment", (data: { message: string }) => {
      // Only add the message if it's not the pending message we just sent
      if (data.message !== pendingMessageRef.current) {
        const newMsg: IMessage = {
          id: Date.now(),
          content: data.message,
          sender: {
            id: Date.now(),
            name: !ifDoctor ? "Doctor" : "Patient",
            isAdmin: !ifDoctor,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
            email: "",
            isVerified: true,
            isOnline: true,
            avatar: null,
          },
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString(),
        };

        setMessages((prev) => [...prev, newMsg]);
        scrollToBottom();
      }
      // Clear the pending message after processing
      pendingMessageRef.current = null;
    });

    return () => {
      socket.off("message.appointment");
    };
  }, [socket, ifDoctor]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({
        top: scrollRef.current.scrollHeight,
        behavior: "instant",
      });
    }
  };

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Store the pending message to prevent duplication
    pendingMessageRef.current = newMessage;

    // Add local message immediately
    const localMsg: IMessage = {
      id: Date.now(),
      content: newMessage,
      sender: {
        id: Date.now(),
        name: ifDoctor ? "Doctor" : "Patient",
        isAdmin: ifDoctor,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        email: "",
        isVerified: true,
        isOnline: true,
        avatar: null,
      },
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };

    setMessages((prev) => [...prev, localMsg]);

    try {
      sendMessage(newMessage);
      setNewMessage("");
      scrollToBottom();
    } catch (error) {
      console.error("Failed to send message:", error);
      // Clear pending message if send fails
      pendingMessageRef.current = null;
    }
  };

  const MessageBubble = ({
    message,
    isCurrentUser,
  }: {
    message: IMessage;
    isCurrentUser: boolean;
  }) => (
    <div
      className={`flex ${isCurrentUser ? "justify-end" : "justify-start"} mb-4`}
    >
      <div
        className={`flex items-start max-w-[70%] ${
          isCurrentUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        <div
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center 
          ${isCurrentUser ? "bg-blue-100" : "bg-green-100"} 
          ${isCurrentUser ? "ml-2" : "mr-2"}`}
        >
          {message.sender.avatar ? (
            <Image
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-10 h-10 rounded-full"
              height={40}
              width={40}
            />
          ) : message.sender.isAdmin ? (
            <Stethoscope className="w-6 h-6 text-blue-500" />
          ) : (
            <UserCircle2 className="w-6 h-6 text-green-500" />
          )}
        </div>
        <div className="flex flex-col">
          <div
            className={`px-4 py-2 rounded-2xl shadow-sm
            ${
              isCurrentUser
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            }`}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div
            className={`text-xs text-gray-500 mt-1 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          >
            <span className="font-medium">
              {message.sender.isAdmin ? "Doctor" : "Patient"}
            </span>
            <span className="mx-1">•</span>
            {format(new Date(message.createdAt), "MMM d, h:mm a")}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col font-sans shadow-lg">
      <CardContent className="flex flex-col h-full p-6">
        <div className="flex items-center mb-2">
          <div
            className={cn(
              "w-3 h-3 rounded-full mr-2",
              isConnected ? "bg-green-500" : "bg-red-500",
              isConnected && "animate-pulse"
            )}
          ></div>
          <p>{isConnected ? "Connected" : "Disconnected"}</p>
        </div>

        <div className="mb-6 pb-3 border-b">
          <h2 className="text-2xl font-bold text-gray-800">
            Medical Consultation Chat
          </h2>
          <p className="text-sm text-gray-600">
            Application Number: {id} • Secure messaging between patient and
            healthcare provider
          </p>
        </div>

        <ScrollArea ref={scrollRef} className="flex-grow mb-6 pr-4">
          <div className="space-y-4">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={message.sender.isAdmin === ifDoctor}
              />
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-3 pt-4 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow text-base"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700 px-6">
            <Send className="w-5 h-5 mr-2" />
            Send
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatClient;
