"use client"

import { updatePaymentStatus } from "@/app/actions/payments";
import { CheckCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../button";

export default function AllApproved({ participants, revalidatePath }) {
    const handleApprovedPayment = async (checked) => {
        if (checked) {
            const ids = participants?.map(participant => participant?.payment?.id)
            try {
                const resp = await updatePaymentStatus(ids, true, revalidatePath)
                if (resp?.error) {
                    throw Error()
                }
                location.reload()
                return toast.success("Payment Status Updated.")

            } catch (err) {
                console.log(err);

                toast.error("There was an problem!")
            }
        }
    }
    // const checked = event?.payments
    const checked = !participants?.every(participant => participant?.payment?.paymentStatus)


    return (
        <>
            <Button variant="outline" onClick={() => handleApprovedPayment(checked)}>
                <CheckCircle className="h-4 w-4" />
                All Approved
            </Button>
        </>
    );
}