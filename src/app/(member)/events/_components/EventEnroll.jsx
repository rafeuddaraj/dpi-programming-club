"use client"
import { enrollEvent } from "@/app/actions/events";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { toast } from "sonner";


export default function EventEnroll({ eventId }) {
    const [loading, setLoading] = useState(false)
    const handleEventEnroll = async () => {
        setLoading(true)
        try {
            const resp = await enrollEvent({ eventId })
            if (resp?.error) {
                throw Error()
            }
            toast.success("Enroll Successful")
        } catch {
            toast.error("There was an problem!")
        }
        setLoading(false)
    }
    return (
        <>
            <Button disabled={loading} onClick={handleEventEnroll}>{loading && <Loader />}Register for Event</Button>
        </>
    );
}