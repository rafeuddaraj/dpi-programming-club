"use client"
import { Button } from "@/components/button";
import { PlusCircle } from "lucide-react";
import { useMemberCollectState } from "./PageWrapper";


export default function AddMemberButton() {
    const { onOpenModal } = useMemberCollectState()
    return (
        <>
            <Button onClick={() => onOpenModal()} className="w-full sm:w-auto">
                <PlusCircle className="mr-2 h-4 w-4" />
                Add Student
            </Button>
        </>
    );
}