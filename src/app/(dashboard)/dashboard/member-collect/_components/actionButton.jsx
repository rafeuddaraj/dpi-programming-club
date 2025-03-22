"use client"
import { Button } from "@/components/button";
import { Edit } from "lucide-react";
import { useMemberCollectState } from "./PageWrapper";


export default function ActionButton({ student }) {
    const { onEditStudent } = useMemberCollectState()
    return (
        <>
            <div className="flex justify-end gap-2 sm:opacity-0 sm:group-hover:opacity-100 transition-opacity">
                <Button variant="ghost" size="icon" onClick={() => onEditStudent(student)}>
                    <Edit className="h-4 w-4" />
                    <span className="sr-only">Edit</span>
                </Button>
            </div>
        </>
    );
}