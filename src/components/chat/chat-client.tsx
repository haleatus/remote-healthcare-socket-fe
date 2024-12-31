"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Send } from "lucide-react";

const doctors = [
  { id: "1", name: "Dr. Alice Johnson", specialty: "Telemedicine Specialist" },
  { id: "2", name: "Dr. Bob Smith", specialty: "Remote Dermatologist" },
  { id: "3", name: "Dr. Chalie Brown", specialty: "Virtual Pediatrician" },
];

const initialMessages = [
  {
    id: 1,
    sender: "Doctor",
    text: "Hello! Welcome to your remote consultation. How can I assist you today?",
  },
  {
    id: 2,
    sender: "You",
    text: "Hi doctor, I've been experiencing a persistent cough for the past week.",
  },
  {
    id: 3,
    sender: "Doctor",
    text: "I'm sorry to hear that. Can you describe the cough? Is it dry or productive? Also, have you had any other symptoms like fever or shortness of breath?",
  },
];

export default function Chat({ id }: { id: string }) {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const [doctor, setDoctor] = useState<{
    id: string;
    name: string;
    specialty: string;
  } | null>(null);

  useEffect(() => {
    const selectedDoctor = doctors.find((d) => d.id === id);
    if (selectedDoctor) {
      setDoctor(selectedDoctor);
    }
  }, [id]);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      const userMessage = {
        id: Date.now(), // Use timestamp as unique ID
        sender: "You",
        text: newMessage,
      };
      setMessages((prevMessages) => [...prevMessages, userMessage]);
      setNewMessage("");

      setTimeout(() => {
        const doctorResponse = {
          id: Date.now(), // Use timestamp as unique ID
          sender: "Doctor",
          text: generateDoctorResponse(newMessage),
        };
        setMessages((prevMessages) => [...prevMessages, doctorResponse]);
      }, 1000);
    }
  };

  const generateDoctorResponse = (userMessage: string) => {
    const lowercaseMessage = userMessage.toLowerCase();
    if (lowercaseMessage.includes("cough")) {
      return "I understand you're experiencing a cough. Given that this is a remote consultation, it's important to gather as much information as possible. Can you tell me if you've measured your temperature recently? Also, are you experiencing any difficulty breathing?";
    } else if (lowercaseMessage.includes("headache")) {
      return "I'm sorry to hear you're experiencing a headache. Since we're conducting this consultation remotely, it would be helpful if you could describe the pain in detail. Is it a dull ache or a sharp pain? Where exactly is the pain located? Have you taken any medication for it?";
    } else if (lowercaseMessage.includes("prescription")) {
      return "Regarding prescriptions, as this is a remote consultation, I can electronically prescribe medication if necessary. However, I'll need to gather more information about your condition first. Can you provide more details about your symptoms and any current medications you're taking?";
    } else {
      return "Thank you for sharing that information. For a more accurate remote diagnosis, could you provide more specific details about your symptoms? When did they start, and have they changed over time? This will help me provide the best possible care despite the distance between us.";
    }
  };

  return (
    <div className="flex-grow container mx-auto px-4 py-8 font-sans">
      <h1 className="text-3xl font-bold mb-4 text-teal-800">
        Remote Consultation with {doctor ? doctor.name : "Doctor"}
      </h1>
      <p className="mb-4 text-gray-600 font-space-grotesk font-semibold">
        {doctor && `Specialty: ${doctor.specialty}`}
      </p>
      <div className="border rounded-lg p-4 h-[67vh] flex flex-col bg-white shadow-md">
        <ScrollArea className="flex-grow mb-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`mb-2 ${
                message.sender === "You" ? "text-right" : "text-left"
              }`}
            >
              <span
                className={`inline-block px-4 py-2 rounded-lg ${
                  message.sender === "You"
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
