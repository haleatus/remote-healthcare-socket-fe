"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { IMedication } from "@/core/interface/medication.interface";
import { Calendar, Clock, Pill } from "lucide-react";
import UpdateMedicationForm from "./update-medication-form";

interface MedicationCardProps {
  medicationData: IMedication;
  isDoctorView?: boolean;
  accessToken?: string;
}

export function MedicationCard({
  medicationData,
  accessToken,
  isDoctorView = false,
}: MedicationCardProps) {
  return (
    <Card className="w-full max-w-sm">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Pill className="h-5 w-5" />
          {medicationData.name} {medicationData.id}
        </CardTitle>
      </CardHeader>
      <CardContent className="relative">
        <div className="grid gap-2">
          <div className="flex items-center gap-2">
            <span className="text-sm">
              {medicationData.description ?? "No description"}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              {medicationData.dosage} - {medicationData.frequency}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">Duration: {medicationData.duration}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-sm">
              Expires:{" "}
              {new Date(medicationData.expirationDate).toLocaleDateString()}
            </span>
          </div>
        </div>
        {isDoctorView && accessToken && (
          <div className="absolute bottom-2 right-2">
            <UpdateMedicationForm
              medicationId={medicationData.id}
              initialMedicationDate={medicationData}
              accessToken={accessToken}
            />
          </div>
        )}
      </CardContent>
    </Card>
  );
}
