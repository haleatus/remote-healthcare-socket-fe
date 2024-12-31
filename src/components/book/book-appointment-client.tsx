"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Calendar,
  Clock,
  Globe,
  AlertCircle,
  MessageCircleMoreIcon,
} from "lucide-react";
import Image from "next/image";

export default function BookAppointmentClient({ id }: { id: string }) {
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [reason, setReason] = useState("");
  const [symptoms, setSymptoms] = useState("");
  const [urgency, setUrgency] = useState("");
  const [timezone, setTimezone] = useState("");

  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Booking remote appointment:", {
      doctorId: id,
      date,
      time,
      reason,
      symptoms,
      urgency,
      timezone,
    });
    router.push(`/chat/${id}`);
  };

  return (
    <div className="flex flex-col lg:flex-row items-center lg:items-start font-sans justify-between container mx-auto px-4 pt-4 pb-12 gap-8">
      {/* Form Section */}
      <form
        onSubmit={handleSubmit}
        className="flex-grow lg:w-1/2 bg-white p-4 rounded-lg shadow-lg space-y-3"
      >
        <h1 className="text-2xl font-bold text-teal-800 mb-6 text-center lg:text-left">
          Book Remote Consultation
        </h1>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <Label
              htmlFor="date"
              className="block text-md font-medium text-gray-700"
            >
              <Calendar className="inline-block mr-2 text-teal-600" /> Preferred
              Date
            </Label>
            <Input
              id="date"
              type="date"
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
              className="mt-2"
            />
          </div>
          <div>
            <Label
              htmlFor="time"
              className="block text-md font-medium text-gray-700"
            >
              <Clock className="inline-block mr-2 text-teal-600" /> Preferred
              Time
            </Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              required
              className="mt-2"
            />
          </div>
        </div>

        {/* Timezone */}
        <div>
          <Label
            htmlFor="timezone"
            className="block text-md font-medium text-gray-700"
          >
            <Globe className="inline-block mr-2 text-teal-600" /> Your Timezone
          </Label>
          <Select onValueChange={setTimezone} required>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select your timezone" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="EST">Eastern Time (EST)</SelectItem>
              <SelectItem value="CST">Central Time (CST)</SelectItem>
              <SelectItem value="MST">Mountain Time (MST)</SelectItem>
              <SelectItem value="PST">Pacific Time (PST)</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Reason */}
        <div>
          <Label
            htmlFor="reason"
            className="block text-md font-medium text-gray-700"
          >
            <AlertCircle className="inline-block mr-2 text-teal-600" /> Reason
            for Consultation
          </Label>
          <Input
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
            className="mt-2"
            placeholder="Enter reason"
          />
        </div>

        {/* Symptoms */}
        <div>
          <Label
            htmlFor="symptoms"
            className="block text-md font-medium text-gray-700"
          >
            <AlertCircle className="inline-block mr-2 text-teal-600" /> Symptoms
          </Label>
          <Textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
            className="mt-2"
            placeholder="Describe your symptoms"
          />
        </div>

        {/* Urgency */}
        <div>
          <Label
            htmlFor="urgency"
            className="block text-md font-medium text-gray-700"
          >
            <AlertCircle className="inline-block mr-2 text-teal-600" /> Urgency
          </Label>
          <Select onValueChange={setUrgency} required>
            <SelectTrigger className="mt-2">
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Routine checkup</SelectItem>
              <SelectItem value="medium">Medium - Minor concern</SelectItem>
              <SelectItem value="high">High - Urgent care needed</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Submit */}
        <Button
          type="submit"
          className="w-full flex items-center justify-center bg-teal-600 hover:bg-teal-700 text-white text-md py-3 rounded-lg shadow-md"
        >
          <MessageCircleMoreIcon className="mr-2 h-5 w-5" />
          Book Consultation
        </Button>
      </form>

      {/* Illustration and Additional Content */}
      <div className="hidden md:flex lg:w-1/2 flex-col items-center justify-center space-y-6 text-center">
        <Image
          src="/book/consultation.svg"
          alt="Remote Consultation Illustration"
          className="mx-auto"
          width={600}
          height={600}
        />
        <p className="text-md text-gray-700 font-space-grotesk">
          Consult with top doctors from the comfort of your home. Select your
          preferred date, time, and urgency, and get the care you deserve!
        </p>
      </div>
    </div>
  );
}
