"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";
import { IMessageResponse, IMessage } from "@/core/interface/message.interface";

interface Message {
  id: string;
  sender: string;
  text: string;
  timestamp: string;
}

interface ChatClientProps {
  id: string;
  userName: string;
  doctorName: string;
  messageSentByPatient: IMessageResponse;
  messageSentByDoctor: IMessageResponse;
}

export default function ChatClient({
  id,
  userName,
  doctorName,
  messageSentByPatient,
  messageSentByDoctor,
}: ChatClientProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  console.log("MBp", messageSentByPatient);
  console.log("MBd", messageSentByDoctor);
  useEffect(() => {
    // Combine and format messages from both patient and doctor
    const formatMessages = () => {
      const patientMessages = messageSentByPatient.data.map(
        (msg: IMessage) => ({
          id: `patient-${msg.id}-${msg.createdAt}`,
          sender: userName,
          text: msg.content,
          timestamp: msg.createdAt,
        })
      );

      const doctorMessages = messageSentByDoctor.data.map((msg: IMessage) => ({
        id: `doctor-${msg.id}-${msg.createdAt}`,
        sender: doctorName,
        text: msg.content,
        timestamp: msg.createdAt,
      }));

      // Combine all messages and sort by timestamp
      const allMessages = [...patientMessages, ...doctorMessages].sort(
        (a, b) =>
          new Date(a.timestamp).getTime() - new Date(b.timestamp).getTime()
      );

      // Add initial greeting if no messages exist
      if (allMessages.length === 0) {
        allMessages.unshift({
          id: `system-greeting-${Date.now()}`,
          sender: doctorName,
          text: `Hello ${userName}! Welcome to your consultation. How can I assist you today?`,
          timestamp: new Date().toISOString(),
        });
      }

      setMessages(allMessages);
    };

    formatMessages();
  }, [messageSentByPatient, messageSentByDoctor, userName, doctorName]);

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage: Message = {
        id: `patient-new-${Date.now()}`,
        sender: userName,
        text: newMessage,
        timestamp: new Date().toISOString(),
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      // Here you would typically make an API call to save the message
      // For now, we'll just simulate the doctor's response
      setTimeout(() => {
        const doctorResponse: Message = {
          id: `doctor-new-${Date.now()}`,
          sender: doctorName,
          text: generateDoctorResponse(newMessage),
          timestamp: new Date().toISOString(),
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

  const formatTime = (timestamp: string) => {
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
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
          <div className="space-y-4">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${
                  message.sender === userName ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-[80%] ${
                    message.sender === userName ? "items-end" : "items-start"
                  }`}
                >
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 mb-1">
                      {message.sender} • {formatTime(message.timestamp)}
                    </span>
                    <span
                      className={`inline-block px-4 py-2 rounded-lg ${
                        message.sender === userName
                          ? "bg-teal-500 text-white"
                          : "bg-gray-200 text-gray-800"
                      }`}
                    >
                      {message.text}
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
          />
          <Button type="submit" className="bg-teal-600 hover:bg-teal-700">
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </div>
    </div>
  );
}
