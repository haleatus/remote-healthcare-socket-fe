"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

interface Message {
  id: number;
  sender: string;
  text: string;
}

interface ChatClientProps {
  id: string;
  userName: string;
  doctorName: string;
}

export default function ChatClient({
  id,
  userName,
  doctorName,
}: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      sender: doctorName,
      text: `Hello ${userName}! Welcome to your consultation. How can I assist you today?`,
    },
  ]);
  const [newMessage, setNewMessage] = useState("");

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(),
        sender: userName,
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      // Simulate doctor's response
      setTimeout(() => {
        const doctorResponse = {
          id: Date.now(),
          sender: doctorName,
          text: generateDoctorResponse(newMessage),
        };
        setMessages((prevMessages) => [...prevMessages, doctorResponse]);
      }, 1000);
    }
  };

  const generateDoctorResponse = (userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes("cough")) {
      return "I understand you're experiencing a cough. Can you tell me if you've measured your temperature recently?";
    } else if (lowercaseMessage.includes("headache")) {
      return "I'm sorry to hear about your headache. Could you describe the pain in detail?";
    } else {
      return "Thank you for sharing. Could you provide more specific details about your symptoms?";
    }
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
        </div>
      </div>

      <div className="border rounded-lg p-4 h-[67vh] flex flex-col bg-white shadow-md">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.sender === userName ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender === userName
                    ? "bg-teal-500 text-white"
                    : "bg-gray-200 text-gray-800"
                }`}
              >
                <span className="font-bold font-space-grotesk">
                  {message.sender}:{" "}
                </span>
                {message.text}
              </span>
            </div>
          ))}
        </ScrollArea>

        <form onSubmit={handleSendMessage} className="flex gap-2">
          <Input
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            placeholder="Type your message..."
            className="flex-grow"
          />
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
