"use client";
import { deleteWorkshop } from "@/app/actions/workshops";
import { DropdownMenuItem } from "@/components/ui/dropdown-menu";
import { Loader2, Trash2 } from "lucide-react";
import { useState } from "react";
import { toast } from "sonner";

export default function DeleteButton({ workshopId }) {
  const [isLoading, setIsLoading] = useState();
  const handleDeleteWorkshop = async () => {
    try {
      const resp = await deleteWorkshop(workshopId);
      if (resp.error) resp?.message;
      toast.success(resp?.message);
    } catch (err) {
      toast.error(err?.message || "Something went wrong!");
    } finally {
      //
    }
  };
  return (
    <>
      <DropdownMenuItem className="text-destructive">
        <button
          onClick={handleDeleteWorkshop}
          disabled={isLoading}
          className="flex gap-2"
        >
          {isLoading ? (
            <Loader2 className="animate-spin" />
          ) : (
            <Trash2 className="mr-2 h-4 w-4" />
          )}
          Delete
        </button>
      </DropdownMenuItem>
    </>
  );
}
