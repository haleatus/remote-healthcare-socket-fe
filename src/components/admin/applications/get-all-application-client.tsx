"use client";

import { AdminApplicationSuccessResponse } from "@/core/types/application.interface";
import React from "react";
import { Trash2, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const GetAllApplicationClient = ({
  allApplicationData,
}: {
  allApplicationData: AdminApplicationSuccessResponse;
}) => {
  return (
    <div>
      <h1 className="text-3xl font-bold mb-6">Applications</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Created At</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>User</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {allApplicationData.data.map((app) => (
            <TableRow key={app.id}>
              <TableCell>{app.id}</TableCell>
              <TableCell>{app.createdAt}</TableCell>
              <TableCell>{app.status}</TableCell>
              <TableCell>{app.user?.name}</TableCell>
              <TableCell>
                <div className="flex space-x-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="outline" size="icon">
                        <Eye className="h-4 w-4" />
                      </Button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Application Details</DialogTitle>
                      </DialogHeader>
                      <div className="mt-4">
                        <p>
                          <strong>ID:</strong> {app.id}
                        </p>
                        <p>
                          <strong>Created At:</strong> {app.createdAt}
                        </p>
                        <p>
                          <strong>Status:</strong> {app.status}
                        </p>
                        <p>
                          <strong>Note:</strong> {app.note}
                        </p>
                        <p>
                          <strong>Visit Date:</strong>{" "}
                          {app.visitDate
                            ? new Date(app.visitDate).toLocaleString()
                            : "Not set"}
                        </p>
                        <p>
                          <strong>User:</strong> {app.user?.name} (
                          {app.user?.email})
                        </p>
                      </div>
                    </DialogContent>
                  </Dialog>
                  <Button variant="outline" size="icon" onClick={() => {}}>
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default GetAllApplicationClient;
