"use client"

import { updatePaymentStatus } from "@/app/actions/payments";
import { toast } from "sonner";
import { Switch } from "../switch";

export default function ApprovedPayment({ paymentId, paymentStatus, revalidatePath }) {
    const handleApprovedPayment = async (checked) => {
        if (checked && !paymentStatus) {
            try {
                const resp = await updatePaymentStatus(paymentId, true, revalidatePath)
                if (resp?.error) {
                    throw Error()
                }
                return toast.success("Payment Status Updated.")

            } catch (err) {
                console.log(err);

                toast.error("There was an problem!")
            }
        }
    }
    return (
        <>
            <Switch onCheckedChange={handleApprovedPayment} />
        </>
    );
}