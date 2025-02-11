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

const ChatClient = ({
  id,
  messagesForApplication,
  ifDoctor,
}: {
  id: string;
  messagesForApplication: IMessage[];
  ifDoctor: boolean;
}) => {
  const [messages, setMessages] = useState(messagesForApplication || []);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [scrollRef]); // Updated dependency

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Here you would typically make an API call to send the message
    // For now, we'll just update the UI
    // const newMsg: IMessage = {
    //   content: newMessage,
    //   sender: {
    //     id: user.id,
    //     name: user.name,
    //     isAdmin: user.isAdmin,
    //     createdAt: "",
    //     updatedAt: "",
    //     email: user.email,
    //     isVerified: false,
    //     isOnline: false,
    //     avatar: null
    //   },
    //   createdAt: new Date().toISOString(),
    // };
    setMessages([...messages]);
    setNewMessage("");
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
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
            isCurrentUser ? "bg-blue-100" : "bg-green-100"
          } ${isCurrentUser ? "ml-2" : "mr-2"}`}
        >
          {message.sender.avatar ? (
            <Image
              src={message.sender.avatar || "/placeholder.svg"}
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
            className={`
            px-4 py-2 rounded-2xl shadow-sm
            ${
              isCurrentUser
                ? "bg-blue-600 text-white rounded-tr-none"
                : "bg-gray-100 text-gray-800 rounded-tl-none"
            }
          `}
          >
            <p className="text-sm">{message.content}</p>
          </div>
          <div
            className={`text-xs text-gray-500 mt-1 ${
              isCurrentUser ? "text-right" : "text-left"
            }`}
          >
            <span className="font-medium">{message.sender.name}</span>
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
