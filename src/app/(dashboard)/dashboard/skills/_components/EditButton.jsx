"use client";

import { Button } from "@/components/button";
import { EditIcon } from "lucide-react";
import { useRouter } from "next/navigation";

export default function EditButton({ id }) {
  const router = useRouter();
  return (
    <>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon"
          onClick={() => router.push(`/dashboard/skills?id=${id}`)}
        >
          <EditIcon className="h-4 w-4" />
        </Button>
      </div>
    </>
  );
}
