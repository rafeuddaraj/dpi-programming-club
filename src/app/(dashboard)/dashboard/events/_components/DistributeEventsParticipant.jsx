
"use client"
import { distributeAllEventsByModerator, removeAllExaminersByEvent } from "@/app/actions/events";
import { Button } from "@/components/button";
import { toast } from "sonner";


export default function DistributeEventsParticipant({ eventId }) {
    console.log(eventId);

    const handleDistribute = async () => {
        try {
            console.log(eventId);

            const resp = await distributeAllEventsByModerator(eventId)
            if (resp?.error)
                throw Error()
            return toast?.success(resp?.message)
        } catch {
            toast?.error("Distributing failed!")
        }
    }
    const handleDistributeRemove = async () => {
        try {
            console.log(eventId);

            const resp = await removeAllExaminersByEvent(eventId)
            if (resp?.error)
                throw Error()
            return toast?.success(resp?.message)
        } catch {
            toast?.error("Distributing failed!")
        }
    }
    return (
        <>
            <Button variant="outline" onClick={handleDistribute}>Distribute</Button>
            <Button variant="outline" onClick={handleDistributeRemove}>Remove Distribute</Button>
        </>
    );
}