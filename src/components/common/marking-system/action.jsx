"use client";

import { reviewParticipantData } from "@/app/actions/workshops";
import { Button } from "@/components/button";
import { Edit } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { ParticipantDetailsModal } from "./participant-details-modal";

export default function Action({ participant, componentType }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();
  const handleSave = async (formData) => {
    try {
      const { score, feedback, complete, certificate } = formData || {};
      const model = `${componentType?.toLowerCase()}Participant`;
      const resp = await reviewParticipantData(
        participant?.id,
        {
          score,
          feedback,
          certificate,
          complete,
        },
        pathname,
        model
      );

      setIsOpen(false);
      if (resp?.error) throw resp.error;
      return toast.success("Saved");
    } catch {
      setIsOpen(false);
      toast.error("Failed to save");
    }
  };
  return (
    <>
      <div className="flex items-center gap-2">
        <Button variant="ghost" size="icon" onClick={() => setIsOpen(true)}>
          <Edit className="h-4 w-4" />
          <span className="sr-only">Edit</span>
        </Button>
      </div>
      {isOpen && (
        <ParticipantDetailsModal
          participant={participant}
          isOpen={isOpen}
          onClose={() => setIsOpen(false)}
          onSave={handleSave}
          componentType={componentType}
        />
      )}
    </>
  );
}
