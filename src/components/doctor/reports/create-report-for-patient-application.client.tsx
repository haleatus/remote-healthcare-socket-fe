import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Plus } from "lucide-react";
import React from "react";

const CreateReportForPatientApplicationClient = () => {
  return (
    <div className="cursor-pointer">
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="rounded-full size-6 text-emerald-500 hover:text-black"
          >
            <Plus className="h-5 w-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p className="text-emerald-500">Add Report To This Application</p>
        </TooltipContent>
      </Tooltip>
    </div>
  );
};

export default CreateReportForPatientApplicationClient;
