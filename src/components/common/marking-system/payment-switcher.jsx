"use client";

import { updatePaymentStatus } from "@/app/actions/payments";
import { Badge } from "@/components/ui/badge";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { PaymentStatusSwitch } from "./payment-status-switch";

export default function PaymentSwitcher({ participant }) {
  const [paymentStatus, setPaymentStatus] = useState(
    participant?.payment?.paymentStatus || false
  );
  // useEffect(() => {
  //   setPaymentStatus(participant?.paymentStatus);
  // }, [participant?.paymentStatus]);
  const pathname = usePathname();
  const handleTogglePaymentStatus = async (checked) => {
    try {
      setPaymentStatus(checked);
      const resp = await updatePaymentStatus(
        participant?.paymentId,
        checked,
        pathname
      );
      if (resp?.error) throw resp.error;
      return toast.success("Payment Status Switch Success.");
    } catch {
      setPaymentStatus(!checked);
      toast.error("Failed to toggle payment status.");
    }
  };
  return (
    <>
      {participant?.payment ? (
        <PaymentStatusSwitch
          isChecked={paymentStatus}
          onToggle={handleTogglePaymentStatus}
        />
      ) : (
        <Badge variant="outline">No Payment</Badge>
      )}
    </>
  );
}
