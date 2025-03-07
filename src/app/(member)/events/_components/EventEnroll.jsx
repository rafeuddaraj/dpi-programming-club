"use client"
import { enrollEvent } from "@/app/actions/events";
import Loader from "@/components/common/loader";
import { Button } from "@/components/ui/button";
import dynamic from "next/dynamic";
import { useState } from "react";
import { toast } from "sonner";

const PaymentModal = dynamic(() => import("@/components/common/PaymentModal"));

export default function EventEnroll({ eventId, event }) {
    const [loading, setLoading] = useState(false)
    const [isPaymentModal, setIsPaymentModal] = useState(false)
    const handleEventEnroll = async () => {
        setLoading(true)
        if (event?.price) {
            setIsPaymentModal(true)
        } else {
            try {
                const resp = await enrollEvent({ ...event, eventId }, false, `/events/${eventId}`)
                if (resp?.error) {
                    throw Error()
                }
                toast.success("Enroll Successful")
                setIsPaymentModal(false)
            } catch {
                toast.error("There was an problem!")
            }
        }
        setLoading(false)
    }


    const enrollPremiumEvent = async (_, paymentData) => {
        try {
            const resp = await enrollEvent({ ...paymentData, ...event }, true, `/events/${eventId}`)
            if (resp?.error) {
                throw Error()
            }
            toast.success("Enroll Successful")
        } catch {
            toast.error("There was an problem!")
        }
    }

    const title = <>This event is premium! Join now for just <span className="font-bold">{event?.price}৳</span> and unlock an exclusive experience!</>
    return (
        <>
            <Button disabled={loading} onClick={handleEventEnroll}>{loading && <Loader />}Register for Event</Button>
            {isPaymentModal && <PaymentModal onSubmit={enrollPremiumEvent} isOpen={isPaymentModal} onClose={() => setIsPaymentModal(false)} title={title} data={event} />}
        </>
    );
}