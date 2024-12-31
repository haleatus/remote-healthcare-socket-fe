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
import { Video } from "lucide-react";

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
    <div className="flex-grow container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6 text-teal-800">
        Book Remote Consultation
      </h1>
      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4 bg-white p-6 rounded-lg shadow-md"
      >
        <div>
          <Label htmlFor="date">Preferred Date</Label>
          <Input
            id="date"
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="time">Preferred Time</Label>
          <Input
            id="time"
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="timezone">Your Timezone</Label>
          <Select onValueChange={setTimezone} required>
            <SelectTrigger>
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
        <div>
          <Label htmlFor="reason">Reason for Consultation</Label>
          <Input
            id="reason"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="symptoms">Symptoms</Label>
          <Textarea
            id="symptoms"
            value={symptoms}
            onChange={(e) => setSymptoms(e.target.value)}
            required
          />
        </div>
        <div>
          <Label htmlFor="urgency">Urgency</Label>
          <Select onValueChange={setUrgency} required>
            <SelectTrigger>
              <SelectValue placeholder="Select urgency" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="low">Low - Routine checkup</SelectItem>
              <SelectItem value="medium">Medium - Minor concern</SelectItem>
              <SelectItem value="high">High - Urgent care needed</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700">
          <Video className="mr-2 h-4 w-4" />
          Book Video Consultation
        </Button>
      </form>
    </div>
  );
}
