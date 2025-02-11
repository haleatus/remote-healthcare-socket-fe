/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React, { useRef, useState } from "react";
import { format } from "date-fns";
import { Card, CardContent } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Send, UserCircle2 } from "lucide-react";
import { IMessage } from "@/core/interface/message.interface";
import Image from "next/image";

const ChatClient = ({
  id,
  messagesForApplication,
}: {
  id: string;
  messagesForApplication: IMessage[];
}) => {
  const [messages, setMessages] = useState(messagesForApplication || []);
  const [newMessage, setNewMessage] = useState("");
  const scrollRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = (e: any) => {
    e.preventDefault();
    if (!newMessage.trim()) return;

    // Here you would typically make an API call to send the message
    // For now, we'll just update the UI
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
        <div className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-gray-100 mr-2">
          {message.sender.avatar ? (
            <Image
              src={message.sender.avatar}
              alt={message.sender.name}
              className="w-8 h-8 rounded-full"
              height={32}
              width={32}
            />
          ) : (
            <UserCircle2 className="w-6 h-6 text-gray-500" />
          )}
        </div>
        <div className="flex flex-col">
          <div
            className={`
            px-4 py-2 rounded-2xl
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
    <Card className="w-full max-w-4xl mx-auto h-[600px] flex flex-col font-sans">
      <CardContent className="flex flex-col h-full p-4">
        <div className="mb-4 pb-2 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Medical Consultation Chat For Application Number {id}
          </h2>
          <p className="text-sm text-gray-500">
            Secure messaging between patient and healthcare provider
          </p>
        </div>

        <ScrollArea ref={scrollRef} className="flex-grow mb-4 pr-4">
          <div className="space-y-2">
            {messages.map((message) => (
              <MessageBubble
                key={message.id}
                message={message}
                isCurrentUser={!message.sender.isAdmin}
              />
            ))}
          </div>
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2 pt-2 border-t">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message here..."
            className="flex-grow"
          />
          <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
            <Send className="w-4 h-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default ChatClient;
