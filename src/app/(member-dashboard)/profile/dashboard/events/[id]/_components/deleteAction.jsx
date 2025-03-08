"use client"

import { deleteEvent } from "@/app/actions/events";
import { Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "../../../../../../components/ui/button";


export default function DeleteAction({ id }) {

    const router = useRouter()
    return (
        <>
            <Button onClick={async () => {
                try {
                    const res = await deleteEvent(id)
                    if (res.error) {
                        throw Error()
                    }
                    router.back()
                    toast.success("Delete Successfully")
                    return
                } catch {
                    toast.error("Something went wrong!")
                }

            }} variant="destructive">
                <Trash2 className="mr-2 h-4 w-4" />
                Delete Event
            </Button>
        </>
    );
}